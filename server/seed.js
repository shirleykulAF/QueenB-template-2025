// server/seed.js
// Script to populate database with mock data

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mentor = require('./models/Mentor');
const Mentee = require('./models/Mentee');

// Load environment variables
dotenv.config();

// Mock data for mentors
const mentorsData = [
  {
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@example.com',
    phone: '050-1234567',
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    yearsOfExperience: 5,
    description: 'Full-stack developer with 5 years of experience. Passionate about mentoring junior developers.',
    linkedinUrl: 'https://linkedin.com/in/sarahcohen',
    availability: 'available'
  },
  {
    firstName: 'David',
    lastName: 'Levy',
    email: 'david.levy@example.com',
    phone: '052-2345678',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    yearsOfExperience: 7,
    description: 'Backend specialist with focus on scalable systems and DevOps practices.',
    linkedinUrl: 'https://linkedin.com/in/davidlevy',
    availability: 'available'
  },
  {
    firstName: 'Rachel',
    lastName: 'Ben-David',
    email: 'rachel.bendavid@example.com',
    phone: '053-3456789',
    technologies: ['React', 'Vue.js', 'TypeScript', 'CSS', 'Figma'],
    yearsOfExperience: 4,
    description: 'Frontend developer and UI/UX enthusiast. Love creating beautiful, accessible web applications.',
    linkedinUrl: 'https://linkedin.com/in/rachelbendavid',
    availability: 'available'
  },
  {
    firstName: 'Michael',
    lastName: 'Goldberg',
    email: 'michael.goldberg@example.com',
    phone: '054-4567890',
    technologies: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Kubernetes'],
    yearsOfExperience: 10,
    description: 'Enterprise architect with expertise in cloud-native applications and microservices.',
    linkedinUrl: 'https://linkedin.com/in/michaelgoldberg',
    availability: 'busy'
  },
  {
    firstName: 'Yael',
    lastName: 'Shapira',
    email: 'yael.shapira@example.com',
    phone: '055-5678901',
    technologies: ['Angular', 'RxJS', 'NestJS', 'GraphQL'],
    yearsOfExperience: 6,
    description: 'Full-stack developer specializing in Angular and modern web technologies.',
    linkedinUrl: 'https://linkedin.com/in/yaelshapira',
    availability: 'available'
  },
  {
    firstName: 'Amit',
    lastName: 'Peretz',
    email: 'amit.peretz@example.com',
    phone: '058-6789012',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    yearsOfExperience: 5,
    description: 'Mobile development expert with experience in both native and cross-platform solutions.',
    linkedinUrl: 'https://linkedin.com/in/amitperetz',
    availability: 'available'
  },
  {
    firstName: 'Tamar',
    lastName: 'Weiss',
    email: 'tamar.weiss@example.com',
    phone: '050-7890123',
    technologies: ['Machine Learning', 'Python', 'TensorFlow', 'Data Science', 'AI'],
    yearsOfExperience: 8,
    description: 'Data scientist with focus on machine learning and AI applications.',
    linkedinUrl: 'https://linkedin.com/in/tamarweiss',
    availability: 'available'
  },
  {
    firstName: 'Ron',
    lastName: 'Mizrahi',
    email: 'ron.mizrahi@example.com',
    phone: '052-8901234',
    technologies: ['DevOps', 'CI/CD', 'Jenkins', 'GitLab', 'Terraform', 'Ansible'],
    yearsOfExperience: 9,
    description: 'DevOps engineer passionate about automation and infrastructure as code.',
    linkedinUrl: 'https://linkedin.com/in/ronmizrahi',
    availability: 'available'
  }
];

// Mock data for mentees
const menteesData = [
  {
    firstName: 'Noa',
    lastName: 'Katz',
    email: 'noa.katz@example.com',
    phone: '050-1111111',
    description: 'Computer Science student looking to improve my React skills',
    lookingFor: ['React', 'JavaScript', 'Frontend']
  },
  {
    firstName: 'Or',
    lastName: 'Solomon',
    email: 'or.solomon@example.com',
    phone: '052-2222222',
    description: 'Junior developer wanting to learn backend development',
    lookingFor: ['Node.js', 'MongoDB', 'Backend']
  },
  {
    firstName: 'Maya',
    lastName: 'Friedman',
    email: 'maya.friedman@example.com',
    phone: '053-3333333',
    description: 'Career changer interested in mobile development',
    lookingFor: ['React Native', 'Mobile', 'Flutter']
  },
  {
    firstName: 'Itai',
    lastName: 'Rosenberg',
    email: 'itai.rosenberg@example.com',
    phone: '054-4444444',
    description: 'Looking for guidance in machine learning and AI',
    lookingFor: ['Machine Learning', 'Python', 'AI']
  },
  {
    firstName: 'Shira',
    lastName: 'Levi',
    email: 'shira.levi@example.com',
    phone: '055-5555555',
    description: 'Want to learn DevOps and cloud technologies',
    lookingFor: ['DevOps', 'AWS', 'Docker']
  },
  {
    firstName: 'Guy',
    lastName: 'Cohen',
    email: 'guy.cohen@example.com',
    phone: '058-6666666',
    description: 'Bootcamp graduate seeking full-stack mentorship',
    lookingFor: ['Full-stack', 'JavaScript', 'React', 'Node.js']
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/queenb_db';
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Mentor.deleteMany({});
    await Mentee.deleteMany({});
    
    // Insert mentors
    console.log('👨‍🏫 Adding mentors...');
    const mentors = await Mentor.insertMany(mentorsData);
    console.log(`✅ Added ${mentors.length} mentors`);
    
    // Insert mentees
    console.log('👩‍🎓 Adding mentees...');
    const mentees = await Mentee.insertMany(menteesData);
    console.log(`✅ Added ${mentees.length} mentees`);
    
    // Create some matches (optional)
    console.log('🤝 Creating some mentor-mentee matches...');
    
    // Match Noa with Sarah (React mentor)
    const noa = await Mentee.findOne({ email: 'noa.katz@example.com' });
    const sarah = await Mentor.findOne({ email: 'sarah.cohen@example.com' });
    if (noa && sarah) {
      await noa.addMentorMatch(sarah._id);
      console.log('  ✅ Matched Noa with Sarah');
    }
    
    // Match Or with David (Backend mentor)
    const or = await Mentee.findOne({ email: 'or.solomon@example.com' });
    const david = await Mentor.findOne({ email: 'david.levy@example.com' });
    if (or && david) {
      await or.addMentorMatch(david._id);
      console.log('  ✅ Matched Or with David');
    }
    
    // Match Maya with Amit (Mobile mentor)
    const maya = await Mentee.findOne({ email: 'maya.friedman@example.com' });
    const amit = await Mentor.findOne({ email: 'amit.peretz@example.com' });
    if (maya && amit) {
      await maya.addMentorMatch(amit._id);
      console.log('  ✅ Matched Maya with Amit');
    }
    
    // Display summary
    console.log('\n📊 Database seeded successfully!');
    console.log('================================');
    console.log(`Total Mentors: ${mentors.length}`);
    console.log(`Total Mentees: ${mentees.length}`);
    console.log(`Matches created: 3`);
    console.log('================================');
    
    console.log('\n🎉 Seed completed! Your database now has mock data.');
    console.log('📝 You can now test the API endpoints with this data.');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed
seedDatabase();