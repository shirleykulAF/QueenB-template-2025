const express = require('express');
const router = express.Router();
const User = require('../models/User');



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