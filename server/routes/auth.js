// routes/auth.js - Complete authentication routes with sessions
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Mentor = require("../models/Mentor");
const Mentee = require("../models/Mentee");

// Validation rules for mentor registration
const mentorValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("firstName").notEmpty().trim().withMessage("First name is required"),
  body("lastName").notEmpty().trim().withMessage("Last name is required"),
  body("programmingLanguages").isArray({ min: 1 }).withMessage("At least one programming language is required"),
  body("technologies").isArray({ min: 1 }).withMessage("At least one technology is required"),
  body("domains").isArray({ min: 1 }).withMessage("At least one domain is required"),
  body("yearsOfExperience").isInt({ min: 0 }).withMessage("Years of experience must be a positive number"),
  body("generalDescription").notEmpty().isLength({ max: 1000 }).withMessage("General description is required and must be under 1000 characters"),
  body("phoneNumber").notEmpty().trim().withMessage("Phone number is required"),
  body("linkedinUrl").optional().isURL().withMessage("LinkedIn URL must be valid")
];

// Validation rules for mentee registration
const menteeValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("firstName").notEmpty().trim().withMessage("First name is required"),
  body("lastName").notEmpty().trim().withMessage("Last name is required"),
  body("phoneNumber").notEmpty().trim().withMessage("Phone number is required"),
  body("generalDescription").optional().isLength({ max: 500 }).withMessage("General description must be under 500 characters")
];

// Login validation
const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];

// POST /api/auth/register-mentor - Complete mentor registration
router.post("/register-mentor", mentorValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email, password,
      firstName, lastName, programmingLanguages, technologies,
      domains, yearsOfExperience, generalDescription,
      phoneNumber, linkedinUrl
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user account
    const user = new User({
      email,
      password,
      userType: "mentor"
    });
    await user.save();

    // Create mentor profile
    const mentor = new Mentor({
      userId: user._id,
      firstName, lastName, programmingLanguages, technologies,
      domains, yearsOfExperience, generalDescription,
      email, phoneNumber, linkedinUrl
    });
    await mentor.save();

    // Auto-login after registration (create session)
    req.session.userId = user._id;
    req.session.userType = user.userType;
    req.session.userEmail = user.email;

    res.status(201).json({
      message: "Mentor registered and logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      mentor: {
        id: mentor._id,
        firstName: mentor.firstName,
        lastName: mentor.lastName
      }
    });

  } catch (error) {
    console.error("Mentor registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /api/auth/register-mentee - Complete mentee registration
router.post("/register-mentee", menteeValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email, password,
      firstName, lastName, phoneNumber, generalDescription = ""
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user account
    const user = new User({
      email,
      password,
      userType: "mentee"
    });
    await user.save();

    // Create mentee profile
    const mentee = new Mentee({
      userId: user._id,
      firstName, lastName, email, phoneNumber, generalDescription
    });
    await mentee.save();

    // Auto-login after registration (create session)
    req.session.userId = user._id;
    req.session.userType = user.userType;
    req.session.userEmail = user.email;

    res.status(201).json({
      message: "Mentee registered and logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      mentee: {
        id: mentee._id,
        firstName: mentee.firstName,
        lastName: mentee.lastName
      }
    });

  } catch (error) {
    console.error("Mentee registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /api/auth/login - Session login
router.post("/login", loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create session
    req.session.userId = user._id;
    req.session.userType = user.userType;
    req.session.userEmail = user.email;

    // Get profile info
    let profile = null;
    if (user.userType === "mentor") {
      profile = await Mentor.findOne({ userId: user._id }).select("-userId -__v");
    } else {
      profile = await Mentee.findOne({ userId: user._id }).select("-userId -__v");
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      profile
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// POST /api/auth/logout - Session logout
router.post("/logout", (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ error: "Not logged in" });
  }

  const userEmail = req.session.userEmail;
  
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Could not log out" });
    }
    res.json({ 
      message: "Logged out successfully",
      user: userEmail
    });
  });
});

// GET /api/auth/me - Check current session
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ 
      error: "Not logged in",
      authenticated: false
    });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy();
      return res.status(401).json({ 
        error: "Invalid session",
        authenticated: false
      });
    }

    let profile = null;
    if (user.userType === "mentor") {
      profile = await Mentor.findOne({ userId: user._id }).select("-userId -__v");
    } else {
      profile = await Mentee.findOne({ userId: user._id }).select("-userId -__v");
    }

    res.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      profile,
      session: {
        active: true,
        userType: req.session.userType
      }
    });
  } catch (error) {
    console.error("Session check error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;