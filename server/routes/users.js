const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const upload = require('../helpers/upload')

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

// User registration route with file upload
router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { username, email, password, role, fullName, address, phoneNumber, country } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get the uploaded file's URL from Cloudinary
        const profilePicture = req.file ? req.file.path : '';

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            profile: {
                fullName,
                address,
                phoneNumber,
                profilePicture, // Store Cloudinary URL
                country,
            },
        });

        await newUser.save();

        // Generate JWT token for the registered user
        const token = jwt.sign({ username: newUser.email }, process.env.secret, { expiresIn: '1d' });

        res.status(201).json({ message: 'User registered successfully', user: newUser.id, token: token, profileImageUrl: profilePicture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


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

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
            userID: user.id,
            isAdmin: user.isAdmin
        }, secret, { algorithm: 'HS256', expiresIn: '1d' })
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

// Update user by ID
router.put('/:id', upload.single('profilePicture'), async (req, res) => {
    try {
        // Extract updates from req.body and req.file
        const updates = {};
        if (req.body.fullName) updates['profile.fullName'] = req.body.fullName;
        if (req.body.address) updates['profile.address'] = req.body.address;
        if (req.body.phoneNumber) updates['profile.phoneNumber'] = req.body.phoneNumber;
        if (req.body.country) updates['profile.country'] = req.body.country;
        if (req.file) updates['profile.profilePicture'] = req.file.path;

        // Update user by ID
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;