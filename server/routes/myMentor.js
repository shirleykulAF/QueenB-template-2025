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
        
        const notesResponse = user.mentorshipNotes || {
            questions: "",
            insights: "",
            goals: ""
        };
        
        res.json({ 
            mentor: user.myMentor || null,
            notes: notesResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// save notes
router.post('/mentee/:userId/notes', async (req, res) => {
    try {
        const { userId } = req.params;
        const { category, content } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.mentorshipNotes) {
            user.mentorshipNotes = {
                questions: "",
                insights: "",
                goals: ""
            };
        }

        if (['questions', 'insights', 'goals'].includes(category)) {
            user.mentorshipNotes[category] = content;
        } else {
            return res.status(400).json({ message: 'Invalid note category' });
        }

        await user.save();

        res.json({ 
            message: 'Notes saved successfully',
            notes: user.mentorshipNotes
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;