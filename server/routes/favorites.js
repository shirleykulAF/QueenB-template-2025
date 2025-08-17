const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add a mentor to favorites
router.post('/:userId/:mentorId', async (req, res) => {
    try {
        const { userId, mentorId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.favoriteMentors.includes(mentorId)) {
            user.favoriteMentors.push(mentorId);
            await user.save();
        }
        res.json({ favoriteMentors: user.favoriteMentors });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// Remove a mentor from favorites
router.delete('/:userId/:mentorId', async (req, res) => {
    try {
        const { userId, mentorId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.favoriteMentors = user.favoriteMentors.filter(
            id => id.toString() !== mentorId
        );
        await user.save();
        res.json({ favoriteMentors: user.favoriteMentors });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// Get all favorite mentors for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('favoriteMentors');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ favoriteMentors: user.favoriteMentors });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;