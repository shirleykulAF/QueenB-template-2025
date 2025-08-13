// server/index.js
// Main server file - connects everything together

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables FIRST
dotenv.config();

// Import database connection
const { connectDB } = require('./config/database');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware - ORDER MATTERS!
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware (helpful for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import route files
const mentorRoutes = require('./routes/mentorRoutes');
const menteeRoutes = require('./routes/menteeRoutes');

// Health check route - BEFORE other routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'QueenB API is running!',
    timestamp: new Date().toISOString(),
    database: 'MongoDB Connected',
    routes: {
      mentors: '/api/mentors',
      mentees: '/api/mentees'
    }
  });
});

// Add this AFTER the health check route and BEFORE the 404 handler
app.get('/api', (req, res) => {
  res.json({
    message: 'QueenB API v1.0',
    documentation: 'See API_DOCUMENTATION.md for details',
    endpoints: {
      health: '/api/health',
      mentors: {
        getAll: 'GET /api/mentors',
        search: 'GET /api/mentors/search?technology=React',
        getOne: 'GET /api/mentors/:id',
        create: 'POST /api/mentors',
        update: 'PUT /api/mentors/:id',
        delete: 'DELETE /api/mentors/:id'
      },
      mentees: {
        getAll: 'GET /api/mentees',
        getOne: 'GET /api/mentees/:id',
        create: 'POST /api/mentees',
        match: 'POST /api/mentees/:id/match',
        update: 'PUT /api/mentees/:id',
        delete: 'DELETE /api/mentees/:id'
      }
    }
  });
});

// API Routes - REGISTER YOUR ROUTES HERE!
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentees', menteeRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to QueenB API',
    endpoints: {
      health: '/api/health',
      mentors: '/api/mentors',
      mentees: '/api/mentees'
    }
  });
});

// 404 handler for unknown routes - MUST BE LAST
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Test endpoints:`);
  console.log(`   http://localhost:${PORT}/`);
  console.log(`   http://localhost:${PORT}/api/health`);
  console.log(`   http://localhost:${PORT}/api/mentors`);
  console.log(`   http://localhost:${PORT}/api/mentees`);
});

module.exports = app;