const userModel = require("../models/user.models");
// const productPartnerModel = require("../models/productpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    console.log("BODY:", req.body);

    const { fullName, email, password } = req.body;

    return res.status(200).json({
      message: "Register route working",
      data: {
        fullName,
        email,
        password,
      },
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
}

async function loginUser(req, res) {
try{
  const { email, password} = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logined successfuly",
    token, 
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    },
  });
} catch(error) {
  res.status(500).json({ message: error.message })
}
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function becomeSeller(req, res) {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.sellerStatus === "pending") {
      return res.status(400).json({ message: "Your application is already pending review." });
    }

    if (user.role === "partner") {
      return res.status(400).json({ message: "You are already a seller." });
    }

    await userModel.findByIdAndUpdate(req.user._id, { sellerStatus: "pending" });

    res.status(200).json({ message: "Application submitted! Awaiting admin approval." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function approveSeller(req, res) {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { role: "partner", sellerStatus: "approved" },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `${user.fullName} is now a seller!`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function rejectSeller(req, res) {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { sellerStatus: "rejected" },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `${user.fullName}'s application rejected.`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getPendingUsers(req, res) {
  try {
    const users = await userModel.find({ sellerStatus: "pending" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  becomeSeller,
  approveSeller,
  rejectSeller,
  getPendingUsers,
  getMe,
  getAllUsers
};




