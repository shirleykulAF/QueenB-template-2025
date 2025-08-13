// server/routes/menteeRoutes.js
// API endpoints for mentee operations

const express = require('express');
const router = express.Router();
const Mentee = require('../models/Mentee');
const Mentor = require('../models/Mentor');

// ==========================================
// GET /api/mentees - Get all mentees
// ==========================================
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching all mentees...');
    
    const mentees = await Mentee.find()
      .populate('matchedMentors.mentorId', 'firstName lastName email') // Populate mentor details
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: mentees.length,
      data: mentees
    });
  } catch (error) {
    console.error('Error fetching mentees:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mentees'
    });
  }
});

// ==========================================
// GET /api/mentees/:id - Get single mentee
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const mentee = await Mentee.findById(req.params.id)
      .populate('matchedMentors.mentorId');
    
    if (!mentee) {
      return res.status(404).json({
        success: false,
        error: 'Mentee not found'
      });
    }
    
    res.json({
      success: true,
      data: mentee
    });
  } catch (error) {
    console.error('Error fetching mentee:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mentee'
    });
  }
});

// ==========================================
// POST /api/mentees - Register new mentee
// ==========================================
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new mentee with data:', req.body);
    
    const mentee = new Mentee(req.body);
    await mentee.save();
    
    // Check if profile is complete
    await mentee.checkProfileCompletion();
    
    console.log('✅ Mentee created successfully:', mentee.fullName);
    
    res.status(201).json({
      success: true,
      data: mentee,
      message: 'Mentee registered successfully!'
    });
  } catch (error) {
    console.error('Error creating mentee:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create mentee'
    });
  }
});

// ==========================================
// POST /api/mentees/:id/match - Match with mentor
// ==========================================
router.post('/:id/match', async (req, res) => {
  try {
    const { mentorId } = req.body;
    
    // Verify mentor exists
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        error: 'Mentor not found'
      });
    }
    
    // Find mentee and add match
    const mentee = await Mentee.findById(req.params.id);
    if (!mentee) {
      return res.status(404).json({
        success: false,
        error: 'Mentee not found'
      });
    }
    
    await mentee.addMentorMatch(mentorId);
    
    res.json({
      success: true,
      message: `Successfully matched with ${mentor.fullName}`,
      data: mentee
    });
  } catch (error) {
    console.error('Error matching:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ==========================================
// PUT /api/mentees/:id - Update mentee
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const mentee = await Mentee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!mentee) {
      return res.status(404).json({
        success: false,
        error: 'Mentee not found'
      });
    }
    
    // Check if profile is now complete
    await mentee.checkProfileCompletion();
    
    res.json({
      success: true,
      data: mentee,
      message: 'Mentee updated successfully!'
    });
  } catch (error) {
    console.error('Error updating mentee:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update mentee'
    });
  }
});

// ==========================================
// DELETE /api/mentees/:id - Delete mentee
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const mentee = await Mentee.findByIdAndDelete(req.params.id);
    
    if (!mentee) {
      return res.status(404).json({
        success: false,
        error: 'Mentee not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Mentee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting mentee:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete mentee'
    });
  }
});

module.exports = router;