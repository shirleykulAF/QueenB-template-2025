const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const router = express.Router();
const jwt = require("jsonwebtoken");


// POST /api/users/register - Register a new user
router.post("/register", async (req, res) => {
  try{
    const { firstName, lastName, email, password, userType, image } = req.body;
    
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
      password,
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

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: savedUser._id,
        userType: savedUser.userType,
        email: savedUser.email
      },
      process.env.JWT_SECRET || 'fallbackSecret',
      { expiresIn: '1h' }
    );

    console.log("User saved successfully!", savedUser._id);

    res.status(201).json({
      success: true, 
      message: "User registered successfully", 
      user: savedUser,
      token 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error during registration",
      error: error.message });
  }
})

// POST /api/users/login - Login a user
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
              success: false,
              message: "Email and password are required"
            });
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ 
              success: false,
              message: "Invalid email"
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
              success: false,
              message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                userType: user.userType,
                email: user.email
            },
            process.env.JWT_SECRET || 'fallbackSecret',
            { expiresIn: '7d' } // Token expires in 7 days
        );

        console.log("User logged in successfully!", user._id);

        res.json({
            success: true,
            message: "User logged in successfully",
            user: user,
            token: token
        });

    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Server error during login", error: error.message,
          error: error.message
        });

    }
});



module.exports = router;


