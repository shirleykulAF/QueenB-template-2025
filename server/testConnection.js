// server/testConnection.js
// Run this file to test if MongoDB connection and schemas work

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import your models
const Mentor = require('./models/Mentor');
const Mentee = require('./models/Mentee');

async function testConnection() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/queenb_db';
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 Connection string:', mongoUri.replace(/:[^:]*@/, ':****@')); // Hide password
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a mentor (without saving)
    const testMentor = new Mentor({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '050-1234567',
      technologies: ['JavaScript', 'React'],
      yearsOfExperience: 3,
      description: 'Test mentor'
    });
    
    // Validate without saving
    await testMentor.validate();
    console.log('✅ Mentor schema validation passed!');
    
    // Test creating a mentee (without saving)
    const testMentee = new Mentee({
      firstName: 'Test',
      lastName: 'Mentee',
      email: 'mentee@example.com',
      phone: '050-7654321',
      description: 'Looking for help'
    });
    
    await testMentee.validate();
    console.log('✅ Mentee schema validation passed!');
    
    // Count documents in collections
    const mentorCount = await Mentor.countDocuments();
    const menteeCount = await Mentee.countDocuments();
    
    console.log(`📊 Current data in database:`);
    console.log(`   - Mentors: ${mentorCount}`);
    console.log(`   - Mentees: ${menteeCount}`);
    
    console.log('\n🎉 All tests passed! Your database connection and schemas are working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    process.exit(0);
  }
}

// Run the test
testConnection();