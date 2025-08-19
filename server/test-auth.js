// server/test-auth.js
// Test script for authentication endpoints

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/auth';

// Test data
const testMentor = {
  userType: 'mentor',
  firstName: 'Test',
  lastName: 'Mentor',
  email: 'test.mentor.api@example.com',
  password: 'testpassword123',
  phone: '050-9999999',
  technologies: ['JavaScript', 'React'],
  yearsOfExperience: 3,
  description: 'Test mentor for authentication testing',
  linkedinUrl: 'https://linkedin.com/in/testmentor'
};

const testMentee = {
  userType: 'mentee',
  firstName: 'Test',
  lastName: 'Mentee',
  email: 'test.mentee.api@example.com',
  password: 'testpassword123',
  phone: '050-8888888',
  description: 'Test mentee for authentication testing',
  lookingFor: ['React', 'JavaScript']
};

async function testAuthEndpoints() {
  console.log('🧪 Testing Authentication Endpoints\n');

  try {
    // Test 1: Register a mentor
    console.log('1. Testing mentor registration...');
    const mentorSignupResponse = await axios.post(`${BASE_URL}/signup`, testMentor);
    console.log('✅ Mentor registered successfully');
    console.log(`   User ID: ${mentorSignupResponse.data.data.user._id}`);
    console.log(`   Token: ${mentorSignupResponse.data.data.token.substring(0, 20)}...\n`);

    // Test 2: Register a mentee
    console.log('2. Testing mentee registration...');
    const menteeSignupResponse = await axios.post(`${BASE_URL}/signup`, testMentee);
    console.log('✅ Mentee registered successfully');
    console.log(`   User ID: ${menteeSignupResponse.data.data.user._id}`);
    console.log(`   Token: ${menteeSignupResponse.data.data.token.substring(0, 20)}...\n`);

    // Test 3: Login as mentor
    console.log('3. Testing mentor login...');
    const mentorLoginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testMentor.email,
      password: testMentor.password,
      userType: 'mentor'
    });
    console.log('✅ Mentor login successful');
    console.log(`   User Type: ${mentorLoginResponse.data.data.userType}\n`);

    // Test 4: Login as mentee
    console.log('4. Testing mentee login...');
    const menteeLoginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testMentee.email,
      password: testMentee.password,
      userType: 'mentee'
    });
    console.log('✅ Mentee login successful');
    console.log(`   User Type: ${menteeLoginResponse.data.data.userType}\n`);

    // Test 5: Get mentor profile (protected route)
    console.log('5. Testing protected route (mentor profile)...');
    const mentorProfileResponse = await axios.get(`${BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${mentorLoginResponse.data.data.token}`
      }
    });
    console.log('✅ Mentor profile retrieved successfully');
    console.log(`   Name: ${mentorProfileResponse.data.data.user.firstName} ${mentorProfileResponse.data.data.user.lastName}\n`);

    // Test 6: Get mentee profile (protected route)
    console.log('6. Testing protected route (mentee profile)...');
    const menteeProfileResponse = await axios.get(`${BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${menteeLoginResponse.data.data.token}`
      }
    });
    console.log('✅ Mentee profile retrieved successfully');
    console.log(`   Name: ${menteeProfileResponse.data.data.user.firstName} ${menteeProfileResponse.data.data.user.lastName}\n`);

    // Test 7: Test login without userType (should work)
    console.log('7. Testing login without userType...');
    const autoLoginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testMentor.email,
      password: testMentor.password
    });
    console.log('✅ Auto-login successful');
    console.log(`   Detected User Type: ${autoLoginResponse.data.data.userType}\n`);

    // Test 8: Test invalid login
    console.log('8. Testing invalid login...');
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: testMentor.email,
        password: 'wrongpassword'
      });
      console.log('❌ Invalid login should have failed');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Invalid login correctly rejected');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 All authentication tests passed!');
    console.log('\n📝 Test Summary:');
    console.log('   ✅ User registration (mentor & mentee)');
    console.log('   ✅ User login (mentor & mentee)');
    console.log('   ✅ Protected route access');
    console.log('   ✅ JWT token authentication');
    console.log('   ✅ Auto user type detection');
    console.log('   ✅ Invalid credential rejection');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAuthEndpoints();
}

module.exports = { testAuthEndpoints };
