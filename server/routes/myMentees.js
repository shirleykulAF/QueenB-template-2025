const express = require('express');
const router = express.Router();
const User = require('../models/User');



// Add a mentee to myMentees
router.post('/:userId/:menteeId', async (req, res) => {
    try {
        const { userId, menteeId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.myMentees.includes(menteeId)) {
            user.myMentees.push(menteeId);
            await user.save();
        }
        res.json({ myMentees: user.myMentees });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// Remove a mentee from myMentees
router.delete('/:userId/:menteeId', async (req, res) => {
    try {
        const { userId, menteeId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.myMentees = user.myMentees.filter(
            id => id.toString() !== menteeId
        );
        await user.save();
        res.json({ myMentees: user.myMentees });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// Get all mentees for a mentor
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('myMentees');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ myMentees: user.myMentees });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message + 'Failed to get mentees' });
    }
});




module.exports = router;