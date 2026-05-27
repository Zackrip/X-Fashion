const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth.middleware");

// User routes
router.post("/", authMiddleware, orderController.createOrder);
router.get("/my-orders", authMiddleware, orderController.getMyOrders);

// Admin routes
router.get("/all", authMiddleware, authorizeRoles("admin"), orderController.getAllOrders);
router.patch("/:id/status", authMiddleware, authorizeRoles("admin"), orderController.updateOrderStatus);

module.exports = router;
