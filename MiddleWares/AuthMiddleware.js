const jwt = require("jsonwebtoken");
const Secret = process.env.JWT_SECRET;

// Middleware to verify token
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, Secret);
      req.user = decoded;

      // Check role if provided
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: "Forbidden: Insufficient rights" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
