const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /mentors
router.get('/', async (req, res) => {
    try {
        const mentors = await User.find({ userType: 'mentor' }); // Only mentors
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// GET /mentor/:id
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


module.exports = router;