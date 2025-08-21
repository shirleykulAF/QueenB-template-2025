const express = require('express');
const router = express.Router();
const User = require('../models/User');

//get mentee's mentor and notes
router.get('/mentee/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('myMentor');
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({ 
            mentor: user.myMentor || null,
            notes: user.mentorshipNotes || ""
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// save notes
router.post('/mentee/:userId/:notes', async (req, res) => {
    try {
        const { userId, notes } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.mentorshipNotes.push(notes);
        await user.save();

        res.json({ message: 'Notes saved successfully', notes: user.mentorshipNotes });
        } catch (error) {
            res.status(500).json({ message: 'Server Error: ' + error.message });
        }
    });

module.exports = router;