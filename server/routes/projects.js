const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Project = require('../models/project');
const Category = require('../models/category');
const User = require('../models/user');
const Bid = require('../models/Bid');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid Image Type');
        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split('').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {

    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }

    const projectList = await Project.find(filter).populate('category');
    // const productList = await Project.find(filter).select('name image');
    if (!projectList) {
        res.status(500), json({ success: false })
    }
    res.status(200).send(projectList);
})

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).lean();
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const consumer = await User.findById(project.consumerId).lean();
        res.status(200).json({ project, consumer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch project details', error });
    }
})

router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.body.consumerId)) {
            return res.status(400).send('Invalid Consumer ID');
        }

        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send('Invalid Category');
        }

        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).send('No image in the request');
        }

        const images = files.map(file => ({
            url: `${req.protocol}://${req.get('host')}/public/uploads/${file.filename}`,
            description: file.originalname,
            uploadedAt: Date.now()
        }));

        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            requirements: req.body.requirements,
            budget: req.body.budget,
            deadline: req.body.deadline,
            consumerId: req.body.consumerId,
            category: req.body.category,
            images: images,
            status: req.body.status
        });

        const savedProject = await project.save();
        if (!savedProject) {
            return res.status(500).send('Project cannot be created');
        }

        res.send(savedProject);
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

router.put('/:id', async (req, res) => {

    const category = await Category.findById(req.body.category);
    if (!category)
        return res.status(400).send('Invalid Category')

    const project = await Project.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    }, {
        new: true
    })

    if (!project)
        return res.status(500).send('Project cannot be updated')
    res.send(project);
})

router.delete('/:id', (req, res) => {
    Project.findByIdAndRemove(req.params.id).then(project => {
        if (project) {
            return res.status(200).json({ success: true, message: 'Product deleted successfully' })
        } else {
            return res.status(404).json({ success: false, message: 'Product cannot find' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

router.get('/get/count', async (req, res) => {
    const projectCount = await Project.countDocuments((count) => count);
    if (!projectList) {
        res.status(500), json({ success: false })
    }
    res.status(200).send({
        projectCount: projectList
    });
})

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const projects = await Project.find({ isFeatured: true }).limit(+count);
    if (!projects) {
        res.status(500), json({ success: false })
    }
    res.status(200).send(projects);
})


// Endpoint to list projects of a specific consumer
router.get('/consumer/:consumerId', async (req, res) => {
    try {
        const consumerId = req.params.consumerId;
        const projects = await Project.find({ consumerId: consumerId });
        res.json(projects);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/applied-projects', async (req, res) => {
    try {
        const userId = req.body.userId;

        // Ensure the user is a maker
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.userType !== 'Maker') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Find projects where the user has placed a bid
        const appliedBids = await Bid.find({ maker_id: userId });
        if (appliedBids.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }

        // Fetch the project details for each bid
        const projectDetails = await Promise.all(
            appliedBids.map(async (bid) => {
                const project = await Project.findById(bid.project_id);
                return project;
            })
        );

        res.json(projectDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/gallery-images/:id', upload.array('images', 10), async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product ID')
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    if (files) {
        files.map(file => {
            imagesPaths.push(`${basePath}${file.fileName}`);
        })
    }

    const project = await Project.findByIdAndUpdate(req.params.id, {

        image: imagesPaths,
    },
        {
            new: true
        })

    if (!project)
        return res.status(500).send('Project cannot be updated')
    res.send(project);
})

module.exports = router;