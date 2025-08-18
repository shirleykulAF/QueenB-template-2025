const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// GET /mentors
// Get all mentors
router.get('/', async (req, res) => {
    try {
        const mentors = await User.find({ userType: 'mentor' }); // Only mentors
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// GET /mentor/:id
// Get mentor by ID
router.get('/mentor/:id', async (req, res) => {
    try {
        const mentor = await User.findById(req.params.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/mentors/update/:id
// Update mentor profile
router.put('/update/:id', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ 
                success: false, 
                message: 'You are not authorized to update this profile' 
            });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        if (user.userType !== 'mentor') {
            return res.status(403).json({ success: false, message: 'Only mentor profiles can be updated here' });
        }

        const updates = { ...req.body };
        delete updates._id; // Remove _id to prevent errors
        
        if (typeof updates.technologies === 'string') {
            updates.technologies = updates.technologies.split(',').map(tech => tech.trim());
        }

        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        } else {
            // Don't update the password if none provided
            delete updates.password;
        }

        const updatedMentor = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true } // Return the updated document
        ).select('-password'); // Don't include password in response

        res.json({
            success: true, 
            message: 'Profile updated successfully', 
            user: updatedMentor
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

module.exports = router;