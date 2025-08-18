const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Mentor = require("../models/Mentor");
const Mentee = require("../models/Mentee");
const Admin = require("../models/Admin");
const { requireAuth, requireAdmin } = require("../middleware/auth");

// GET /api/admin/users - צפייה בכל המשתמשות עם פילטרים
router.get("/users", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, userType, search } = req.query;
    const skip = (page - 1) * limit;
    
    // בניית query לחיפוש
    let userQuery = {};
    
    // פילטר לפי סוג משתמש
    if (userType && ['mentor', 'mentee', 'admin'].includes(userType)) {
      userQuery.userType = userType;
    }
    
    // שליפת המשתמשים (ראשית בלי פילטר חיפוש)
    const users = await User.find(userQuery)
      .select("email userType createdAt")
      .sort({ createdAt: -1 });

    // שליפת פרופילים מפורטים לכל משתמש - עם כל הפרטים
    const usersWithProfiles = await Promise.all(
      users.map(async (user) => {
        let profile = null;
        
        if (user.userType === 'mentor') {
          profile = await Mentor.findOne({ userId: user._id })
            .select("firstName lastName programmingLanguages technologies domains yearsOfExperience phoneNumber linkedinUrl generalDescription");
        } else if (user.userType === 'mentee') {
          profile = await Mentee.findOne({ userId: user._id })
            .select("firstName lastName phoneNumber generalDescription");
        } else if (user.userType === 'admin') {
          profile = await Admin.findOne({ userId: user._id })
            .select("firstName lastName isActive lastLogin");
        }

        return {
          ...user.toObject(),
          profile
        };
      })
    );

    // חיפוש - מסנן את המשתמשים עם הפרופילים
    let filteredUsers = usersWithProfiles;
    
    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      filteredUsers = usersWithProfiles.filter(user => {
        // חיפוש באימייל
        const emailMatch = user.email.toLowerCase().includes(searchTerm);
        
        // חיפוש בשם פרטי ומשפחה (אם קיים פרופיל)
        let nameMatch = false;
        if (user.profile) {
          const firstName = user.profile.firstName ? user.profile.firstName.toLowerCase() : '';
          const lastName = user.profile.lastName ? user.profile.lastName.toLowerCase() : '';
          const fullName = `${firstName} ${lastName}`.trim();
          
          nameMatch = firstName.includes(searchTerm) || 
                     lastName.includes(searchTerm) || 
                     fullName.includes(searchTerm);
        }
        
        return emailMatch || nameMatch;
      });
    }

    // Pagination על התוצאות המסוננות
    const totalFilteredUsers = filteredUsers.length;
    const paginatedUsers = filteredUsers.slice(skip, skip + parseInt(limit));

    // סטטיסטיקות בסיסיות
    const stats = {
      total: await User.countDocuments(),
      mentors: await User.countDocuments({ userType: 'mentor' }),
      mentees: await User.countDocuments({ userType: 'mentee' }),
      admins: await User.countDocuments({ userType: 'admin' })
    };

    res.json({
      message: `Found ${totalFilteredUsers} users`,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalFilteredUsers / limit),
        totalUsers: totalFilteredUsers,
        limit: parseInt(limit)
      },
      filters: { userType, search },
      stats,
      users: paginatedUsers,
      requestedBy: {
        adminId: req.session.userId,
        adminEmail: req.session.userEmail,
        adminName: `${req.adminProfile.firstName} ${req.adminProfile.lastName}`
      }
    });

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});


// DELETE /api/admin/users/:id - Delete user (admin only)
router.delete("/users/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.session.userId.toString()) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    // Delete profile first based on user type
    if (user.userType === 'mentor') {
      await Mentor.findOneAndDelete({ userId: user._id });
    } else if (user.userType === 'mentee') {
      await Mentee.findOneAndDelete({ userId: user._id });
    } else if (user.userType === 'admin') {
      await Admin.findOneAndDelete({ userId: user._id });
    }

    // Delete the user account
    await User.findByIdAndDelete(user._id);

    res.json({
      message: "User deleted successfully",
      deletedUser: {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      deletedBy: {
        adminId: req.session.userId,
        adminEmail: req.session.userEmail
      }
    });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;