const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Bid = require('../models/Bid');
const User = require('../models/user');

// Apply bid on a project 
router.put('/:projectId', async (req, res) => {
    try {
        const project_id = req.params.projectId;
        const { maker_id, bid_amount, proposal_text } = req.body;

        // Validate input
        if (!maker_id || !bid_amount) {
            return res.status(400).json({ message: 'Bidder ID and amount are required.' });
        }

        // Ensure the user is a maker
        const user = await User.findById(maker_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.userType !== 'Maker') {
            return res.status(403).json({ message: 'Only Makers can bid on projects' });
        }

        // Find the project by ID
        const project = await Project.findById(project_id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Check if the bidder has already placed a bid on this project
        const existingBid = await Bid.findOne({ maker_id: maker_id, project_id: project_id });
        if (existingBid) {
            return res.status(400).json({ message: 'You have already placed a bid on this project.' });
        }

        // Create a new bid
        const newBid = new Bid({
            project_id,
            maker_id,
            bid_amount,
            proposal_text,
            createdAt: new Date()
        });

        // Save the new bid
        await newBid.save();

        // Respond with the new bid
        res.status(200).json(newBid);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
});

module.exports = router;
