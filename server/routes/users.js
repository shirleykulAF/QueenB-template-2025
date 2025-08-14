const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { getAllUsers } = require("../services/usersService");

// GET /api/users - Get all users
router.get("/", (req, res) => {
  const users = getAllUsers();
  res.json(users);
});


// POST /api/users/register - Register a new user
router.post("/register", async (req, res) => {
  try{
    const { firstName, lastName, email } = req.body;
    
    // check if user already exists
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({ message: "email already in use" });
    }

    // Create a new user instance
    const user = new User({
      firstName, 
      lastName, 
      email 
    });
    await user.save();
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


