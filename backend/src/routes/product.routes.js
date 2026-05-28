const express = require("express");
const productController = require("../controllers/product.controller");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  authMiddleware,
  authorizeRoles("partner", "admin"),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
    { name: "shorts", maxCount: 5 },
  ]),
  productController.createProduct,
);

router.get("/", productController.getAllProducts);

router.get(
  "/my-products",
  authMiddleware,
  authorizeRoles("partner"),
  productController.getMyProducts
);

router.get("/shorts", productController.getShorts);

router.get(
  "/:id",
  productController.getSingleProduct,
);


router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("partner", "admin"),
  productController.deleteProduct
);

router.post("/:id/reviews", authMiddleware, productController.createReview);

module.exports = router;

