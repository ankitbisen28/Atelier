const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
require('dotenv/config');

const JWT_SECRET = process.env.secret;

router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ success: false, message: 'The user with the given ID not exists' })
    }
    res.status(200).send(user)

})

router.post('/register', async (req, res) => {
    // checking if user already exist 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("email already exists");

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        userType: req.body.userType
    })

    user = await user.save();

    if (!user)
        return res.status(404).send('User cannot be created')

    // Generate JWT token for the registered user
    const token = jwt.sign({ username: user.email }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user: user.id, token });
    // res.send(user);
})

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'User deleted successfully' })
        } else {
            return res.status(404).json({ success: false, message: 'User cannot find' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.secret;

    if (!user) {
        return res.status(400).send('User with given Email not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
            userID: user.id,
            isAdmin: user.isAdmin
        }, secret, { algorithm: 'HS256', expiresIn: '5d' })
        res.status(200).json({ user: user.id, token: token });
    } else {
        res.status(400).send('Password is mismatch');
    }

    // return res.status(200).send(user);
})

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments((count) => count);
    if (!userCount) {
        res.status(500), json({ success: false })
    }
    res.status(200).send({
        userCount: userCount
    });
})

router.put('/:id', async (req, res) => {
    const { name, email, phone, apartment, street, city, zip, country, userType } = req.body;

    try {
        const user = await User.findById(req.params.id).select('-passwordHash');;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // checking if user already exist 
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send("email already exists");

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.apartment = apartment;
        user.street = street;
        user.city = city;
        user.zip = zip;
        user.country = country;
        user.userType = userType;

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                apartment: user.apartment,
                street: user.street,
                city: user.city,
                zip: user.zip,
                country: user.country,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router;