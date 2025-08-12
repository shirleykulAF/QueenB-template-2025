const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const User = require("../models/User");
const Mentor = require("../models/Mentor");
const Mentee = require("../models/Mentee");
const uploadPhoto = require("../middleware/upload");

// Validation rules for mentee registration (unchanged)
const menteeValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("firstName").notEmpty().trim().withMessage("First name is required"),
  body("lastName").notEmpty().trim().withMessage("Last name is required"),
  body("phoneNumber").notEmpty().trim().withMessage("Phone number is required"),
  body("generalDescription").optional().isLength({ max: 500 }).withMessage("General description must be under 500 characters")
];

// Validation for mentor registration (updated for form-data)
const mentorValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("firstName").notEmpty().trim().withMessage("First name is required"),
  body("lastName").notEmpty().trim().withMessage("Last name is required"),
  body("programmingLanguages").notEmpty().withMessage("Programming languages are required"),
  body("technologies").notEmpty().withMessage("Technologies are required"),
  body("domains").notEmpty().withMessage("Domains are required"),
  body("yearsOfExperience").isInt({ min: 0 }).withMessage("Years of experience must be a positive number"),
  body("generalDescription").notEmpty().isLength({ max: 1000 }).withMessage("General description is required"),
  body("phoneNumber").notEmpty().trim().withMessage("Phone number is required"),
  body("linkedinUrl").optional().isURL().withMessage("LinkedIn URL must be valid")
];

// Login validation
const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];

// POST /api/auth/register-mentor - With photo upload
router.post("/register-mentor", 
  uploadPhoto,        // Handle file upload first
  mentorValidation,   // Then validate other fields
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if photo was uploaded
      if (!req.file) {
        return res.status(400).json({ 
          error: "Profile photo is required",
          message: "Please upload a profile photo" 
        });
      }

      console.log("📸 Photo uploaded:", {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });

      // Parse arrays if they come as strings (form-data)
      let { programmingLanguages, technologies, domains } = req.body;
      
      if (typeof programmingLanguages === 'string') {
        programmingLanguages = programmingLanguages.split(',').map(lang => lang.trim());
      }
      if (typeof technologies === 'string') {
        technologies = technologies.split(',').map(tech => tech.trim());
      }
      if (typeof domains === 'string') {
        domains = domains.split(',').map(domain => domain.trim());
      }

      const {
        email, password, firstName, lastName, yearsOfExperience,
        generalDescription, phoneNumber, linkedinUrl
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

      // Create mentor profile with photo
      const mentor = new Mentor({
        userId: user._id,
        firstName,
        lastName,
        programmingLanguages,
        technologies,
        domains,
        yearsOfExperience: parseInt(yearsOfExperience),
        generalDescription,
        email,
        phoneNumber,
        linkedinUrl,
        profilePhoto: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        },
        photoFileName: req.file.originalname
      });

      await mentor.save();

      // Auto-login after registration
      req.session.userId = user._id;
      req.session.userType = user.userType;
      req.session.userEmail = user.email;

      res.status(201).json({
        message: "Mentor registered successfully with profile photo",
        user: {
          id: user._id,
          email: user.email,
          userType: user.userType
        },
        mentor: {
          id: mentor._id,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          hasProfilePhoto: true,
          photoSize: req.file.size
        }
      });

    } catch (error) {
      console.error("Mentor registration error:", error);
      
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: "File too large. Maximum size is 5MB." });
        }
        return res.status(400).json({ error: "File upload error: " + error.message });
      }
      
      res.status(500).json({ error: "Server error during registration" });
    }
  }
);

// POST /api/auth/register-mentee - Unchanged
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({
      email,
      password,
      userType: "mentee"
    });
    await user.save();

    const mentee = new Mentee({
      userId: user._id,
      firstName, lastName, email, phoneNumber, generalDescription
    });
    await mentee.save();

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

// POST /api/auth/login - Unchanged
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

    req.session.userId = user._id;
    req.session.userType = user.userType;
    req.session.userEmail = user.email;

    let profile = null;
    if (user.userType === "mentor") {
      profile = await Mentor.findOne({ userId: user._id }).select("-userId -__v -profilePhoto");
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

// POST /api/auth/logout - Unchanged
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

// GET /api/auth/me - Unchanged
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
      profile = await Mentor.findOne({ userId: user._id }).select("-userId -__v -profilePhoto");
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