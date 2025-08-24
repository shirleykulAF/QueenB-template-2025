const express = require('express');
const router = express.Router();
const User = require('../models/User');


// mentee page:

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






// mentor page:

//get mentee's mentor
router.get('/:mentorId/:menteeId', async (req, res) => {
    try {
        const { menteeId } = req.params;
        const mentee = await User.findById(menteeId).populate('myMentor');
        if (!mentee) {
            return res.status(404).json({ message: 'Mentee not found' });
        }        
        res.json({mentor: mentee.myMentor });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// Add a mentor to mentee's myMentors
router.post('/:mentorId/:menteeId', async (req, res) => {
    try {
        const { mentorId, menteeId } = req.params;
        
        //check if mentee exists
        const mentee = await User.findById(menteeId);
        if (!mentee) {
            return res.status(404).json({ message: 'Mentee not found' });
        }

        //check if theres allready mentor
        if (mentee.myMentor) {
            return res.status(409).json({ 
                message: 'Mentee already has a mentor',
                currentMentor: mentee.myMentor 
            });
        }

        //define mentor
        mentee.myMentor = mentorId;
        await mentee.save();

        res.json({ 
            message: 'Mentor assigned successfully',
            mentor: mentorId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// Remove a mentor from myMentors
router.delete('/:mentorId/:menteeId', async (req, res) => {
    try {
        const { menteeId } = req.params;
        
        const mentee = await User.findById(menteeId);
        if (!mentee) {
            return res.status(404).json({ message: 'Mentee not found' });
        }
        

        mentee.myMentor = null;
        await mentee.save();

        res.json({ message: 'Mentor removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove mentor from myMentor: ' + error.message });
    }
});


module.exports = router;