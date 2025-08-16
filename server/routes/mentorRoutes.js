// server/routes/mentorRoutes.js
// API endpoints for mentor operations

const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');

// ==========================================
// GET /api/mentors - Get all mentors 
// ==========================================
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching all mentors...');
    
    const mentors = await Mentor.find()
      .sort({ createdAt: -1 }); // Newest first
    
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mentors'
    });
  }
});

// ==========================================
// GET /api/mentors/search - Search mentors // by full name or Technologis
// ==========================================
router.get('/search', async (req, res) => {
  try {
    const { technology, name } = req.query;
    let query = {};
    
    // Build search query
    if (technology) {
      query.technologies = { 
        $regex: new RegExp(technology, 'i') 
      };
    }
    
    if (name) {
      query.$or = [
        { firstName: { $regex: new RegExp(name, 'i') } },
        { lastName: { $regex: new RegExp(name, 'i') } }
      ];
    }
    
    const mentors = await Mentor.find(query);
    
    res.json({
      success: true,
      count: mentors.length,
      data: mentors
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
});

// ==========================================
// GET /api/mentors/:id - Get single mentor
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        error: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      data: mentor
    });
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch mentor'
    });
  }
});

// ==========================================
// POST /api/mentors - Create new mentor
// ==========================================
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new mentor with data:', req.body);
    
    // Create new mentor instance
    const mentor = new Mentor(req.body);
    
    // Save to database
    await mentor.save();
    
    console.log('✅ Mentor created successfully:', mentor.fullName);
    
    res.status(201).json({
      success: true,
      data: mentor,
      message: 'Mentor registered successfully!'
    });
  } catch (error) {
    console.error('Error creating mentor:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors
      });
    }
    
    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create mentor'
    });
  }
});

// ==========================================
// PUT /api/mentors/:id - Update mentor
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        error: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      data: mentor,
      message: 'Mentor updated successfully!'
    });
  } catch (error) {
    console.error('Error updating mentor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update mentor'
    });
  }
});

// ==========================================
// DELETE /api/mentors/:id - Delete mentor
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        error: 'Mentor not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Mentor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete mentor'
    });
  }
});

module.exports = router;