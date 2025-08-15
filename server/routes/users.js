const express = require("express");
const User = require("../models/User");
const router = express.Router();
// const { getAllUsers } = require("../services/usersService");

// // GET /api/users - Get all users
// router.get("/", (req, res) => {
//   const users = getAllUsers();
//   res.json(users);
// });


// POST /api/users/register - Register a new user
router.post("/register", async (req, res) => {
  try{
    const { firstName, lastName, email, userType, image } = req.body;
    
    // check if user already exists
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({ message: "email already in use" });
    }

    // Create a new user instance
    const userData = {
      firstName, 
      lastName, 
      email,
      userType

    };
    
    if (image) {
      userData.image = image;
    }

    if (userType === 'mentor'){
      const { technologies, yearsOfExperience, description, phone, linkedin } = req.body;
      userData.technologies = technologies ? technologies.split(',') : [];
      userData.yearsOfExperience = yearsOfExperience;
      userData.description = description;
      userData.phone = phone;
      userData.linkedin = linkedin;
    }

    const user = new User(userData);
    const savedUser = await user.save();

    console.log("User saved successfully!", savedUser._id);

    res.status(201).json({
      success: true, 
      message: "User registered successfully", 
      user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message });
  }
})

// POST /api/users/login - Login a user
router.post("/login", async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ 
              success: false,
              message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User logged in successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Server error", error: error.message,
          error: error.message
        });

    }
});



module.exports = router;


