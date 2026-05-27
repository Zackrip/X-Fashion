const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) { 
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const user = await userModel.findById(decoded.id);

    if(!user) {
      return res.status(401).json({
        message: "user not found"
      })
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized access",
    });
  }
}

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({
        message: "Access Denined"
      });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorizeRoles,
};
