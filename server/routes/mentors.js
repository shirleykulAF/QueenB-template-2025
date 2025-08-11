const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

// GET /mentors
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// GET /mentors/:id
router.get('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;