// Test file to debug the import issue
const connectDB = require('./config/database');

console.log('Type of connectDB:', typeof connectDB);
console.log('connectDB:', connectDB);

if (typeof connectDB === 'function') {
  console.log('✅ connectDB is a function');
} else {
  console.log('❌ connectDB is not a function');
}
