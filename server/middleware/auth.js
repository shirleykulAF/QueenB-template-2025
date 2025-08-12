const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ 
      error: "Authentication required", 
      message: "Please login to access this resource",
      authenticated: false
    });
  }
  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ 
        error: "Authentication required",
        authenticated: false
      });
    }
    
    if (req.session.userType !== role) {
      return res.status(403).json({ 
        error: "Access denied", 
        message: `${role} role required. You are: ${req.session.userType}`,
        requiredRole: role,
        currentRole: req.session.userType
      });
    }
    
    next();
  };
};

// Optional: middleware to check if user is logged in (doesn't block, just adds info)
const checkAuth = (req, res, next) => {
  req.isAuthenticated = !!req.session.userId;
  req.currentUser = req.session.userId ? {
    id: req.session.userId,
    type: req.session.userType,
    email: req.session.userEmail
  } : null;
  next();
};

module.exports = { 
  requireAuth, 
  requireRole, 
  checkAuth 
};