const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET api/mentees
router.get('/', async (req, res) => {
    try {
        const mentors = await User.find({ userType: 'mentee' }); // Only mentees
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// GET api/mentee/:id
router.get('/mentee/:id', async (req, res) => {
    try {
        const mentee = await User.findById(req.params.id);
        if (!mentee) {
            return res.status(404).json({ message: 'Mentee not found' });
        }
        res.json(mentee);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;