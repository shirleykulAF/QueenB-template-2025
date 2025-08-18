const mongoose = require("mongoose");
const readline = require("readline");
require("dotenv").config();

// Import models
const User = require("./models/User");
const Admin = require("./models/Admin");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const createFirstAdmin = async () => {
  try {
    // התחברות למסד הנתונים
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/queenb";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("🍃 Connected to MongoDB");

    // בדיקה אם כבר יש אדמין במערכת
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log("❌ Admin already exists in the system!");
      console.log(`Existing admin: ${existingAdmin.email}`);
      process.exit(0);
    }

    console.log("👑 Creating First Admin Account");
    console.log("===============================");

    // קבלת פרטים מהמשתמש
    const email = await question("Enter admin email: ");
    
    // בדיקה שהאימייל לא קיים
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log("❌ Email already exists!");
      process.exit(1);
    }

    const password = await question("Enter admin password (min 6 characters): ");
    
    if (password.length < 6) {
      console.log("❌ Password must be at least 6 characters!");
      process.exit(1);
    }

    const firstName = await question("Enter first name: ");
    const lastName = await question("Enter last name: ");
    const phoneNumber = await question("Enter phone number: ");

    // יצירת המשתמש
    const user = new User({
      email: email.toLowerCase(),
      password,
      userType: "admin"
    });
    await user.save();

    // יצירת פרופיל האדמין
    const admin = new Admin({
      userId: user._id,
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber
    });
    await admin.save();

    console.log("\n✅ First admin created successfully!");
    console.log("===================================");
    console.log(`👤 Name: ${firstName} ${lastName}`);
    console.log(`📧 Email: ${email}`);
    console.log(`👑 User Type: admin`);
    console.log("\nYou can now login with these credentials.");
    console.log("\nAvailable endpoints for admin:");
    console.log("- GET /api/admin/dashboard");
    console.log("- GET /api/admin/users");
    console.log("- GET /api/admin/users/:id");

  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    rl.close();
    mongoose.connection.close();
    process.exit(0);
  }
};

// הרצת הפונקציה
createFirstAdmin();