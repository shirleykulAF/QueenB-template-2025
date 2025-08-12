// routes/mentors.js - Mentor routes with session authentication
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Mentor = require("../models/Mentor");
const User = require("../models/User");
const { requireAuth, requireRole } = require("../middleware/auth");

// GET /api/mentors - View all mentors (requires login)
router.get("/", requireAuth, async (req, res) => {
  try {
    const mentors = await Mentor.find({})
      .select("-userId -__v")
      .sort({ createdAt: -1 });
    
    res.json({ 
      message: `Found ${mentors.length} mentors`,
      requestedBy: {
        userId: req.session.userId,
        userType: req.session.userType,
        email: req.session.userEmail
      },
      mentors 
    });
  } catch (error) {
    console.error("Get mentors error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/mentors/search - Search mentors (requires login)
router.get("/search", requireAuth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.json({ 
        message: "Please provide a search query",
        searchQuery: q,
        mentors: [] 
      });
    }

    const searchQuery = q.trim();
    const mentors = await Mentor.find({
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { programmingLanguages: { $in: [new RegExp(searchQuery, 'i')] } },
        { technologies: { $in: [new RegExp(searchQuery, 'i')] } },
        { domains: { $in: [new RegExp(searchQuery, 'i')] } },
        { generalDescription: { $regex: searchQuery, $options: 'i' } }
      ]
    }).select("-userId -__v");

    res.json({ 
      message: `Found ${mentors.length} mentors matching "${searchQuery}"`,
      searchQuery: searchQuery,
      requestedBy: {
        userId: req.session.userId,
        userType: req.session.userType
      },
      mentors 
    });
  } catch (error) {
    console.error("Search mentors error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/mentors/:id - Get specific mentor details (requires login)
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id).select("-userId -__v");
    
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    
    res.json({ 
      mentor,
      viewedBy: {
        userId: req.session.userId,
        userType: req.session.userType
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid mentor ID format" });
    }
    console.error("Get mentor details error:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/mentors/profile - Update mentor profile (mentors only)
router.put("/profile", requireRole("mentor"), [
  body("firstName").optional().notEmpty().trim().withMessage("First name cannot be empty"),
  body("lastName").optional().notEmpty().trim().withMessage("Last name cannot be empty"),
  body("programmingLanguages").optional().isArray({ min: 1 }).withMessage("At least one programming language is required"),
  body("technologies").optional().isArray({ min: 1 }).withMessage("At least one technology is required"),
  body("domains").optional().isArray({ min: 1 }).withMessage("At least one domain is required"),
  body("yearsOfExperience").optional().isInt({ min: 0 }).withMessage("Years of experience must be a positive number"),
  body("generalDescription").optional().isLength({ max: 1000 }).withMessage("General description must be under 1000 characters"),
  body("phoneNumber").optional().notEmpty().trim().withMessage("Phone number cannot be empty"),
  body("linkedinUrl").optional().isURL().withMessage("LinkedIn URL must be valid")
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName, lastName, programmingLanguages, technologies,
      domains, yearsOfExperience, generalDescription,
      phoneNumber, linkedinUrl
    } = req.body;

    const mentor = await Mentor.findOne({ userId: req.session.userId });
    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    // Update only provided fields
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (programmingLanguages !== undefined) updateData.programmingLanguages = programmingLanguages;
    if (technologies !== undefined) updateData.technologies = technologies;
    if (domains !== undefined) updateData.domains = domains;
    if (yearsOfExperience !== undefined) updateData.yearsOfExperience = yearsOfExperience;
    if (generalDescription !== undefined) updateData.generalDescription = generalDescription;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl;

    // Apply updates
    Object.assign(mentor, updateData);
    await mentor.save();

    res.json({
      message: "Mentor profile updated successfully",
      updatedFields: Object.keys(updateData),
      mentor: await Mentor.findOne({ userId: req.session.userId }).select("-userId -__v")
    });

  } catch (error) {
    console.error("Update mentor profile error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/mentors/my/profile - Get current mentor's own profile
router.get("/my/profile", requireRole("mentor"), async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ userId: req.session.userId }).select("-userId -__v");
    
    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }
    
    res.json({ 
      message: "Your mentor profile",
      mentor 
    });
  } catch (error) {
    console.error("Get own mentor profile error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;