const express = require('express');
const authController = require('../controllers/auth.controller');
const { authMiddleware, authorizeRoles } = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.get("/me", authMiddleware, authController.getMe);
router.patch("/become-seller", authMiddleware, authController.becomeSeller);
router.get("/pending-sellers", authMiddleware, authorizeRoles("admin"), authController.getPendingUsers);
router.get("/all-users", authMiddleware, authorizeRoles("admin"), authController.getAllUsers);
router.patch("/approve-seller/:userId", authMiddleware, authorizeRoles("admin"), authController.approveSeller);
router.patch("/reject-seller/:userId", authMiddleware, authorizeRoles("admin"), authController.rejectSeller);

module.exports = router;
