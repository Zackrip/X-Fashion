const productModel = require("../models/product.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const normalizeArray = (field) => {
  if (!field) return [];
  return Array.isArray(field) ? field : [field];
};

const createProduct = async (req, res) => {
  try {
    if (
      !req.files ||
      (!req.files.images && !req.files.videos && !req.files.shorts)
    ) {
      return res.status(400).json({ message: "At least one file is required" });
    }

    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const uploadFiles = async (files) => {
      if (!files || files.length === 0) return [];

      const uploads = await Promise.all(
        files
          .filter((file) => file && file.buffer)
          .map((file) => {
            const ext = file.originalname
              ? file.originalname.split(".").pop()
              : "jpg";
            return storageService.uploadFile(file.buffer, `${uuid()}.${ext}`);
          })
      );

      return uploads.map((f) => ({ url: f.url }));
    };

    const images = await uploadFiles(req.files?.images || []);
    const videos = await uploadFiles(req.files?.videos || []);
    const shorts = await uploadFiles(req.files?.shorts || []);

    console.log("Uploaded files:", {
      requestFiles: req.files,
      images,
      videos,
      shorts,
    });

    const productItem = await productModel.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price) || 0,
      discountPrice: Number(req.body.discountPrice) || 0,
      countInStock: Number(req.body.countInStock) || 0,
      sku: req.body.sku,
      category: req.body.category,
      brand: req.body.brand,

      sizes: normalizeArray(req.body.sizes),
      colors: normalizeArray(req.body.colors),
      collections: normalizeArray(req.body.collections),

      materials: req.body.materials,
      gender: req.body.gender,

      images,
      videos,
      shorts,

      isFeatured: req.body.isFeatured === "true",
      isPublished: req.body.isPublished === "true",

      rating: Number(req.body.rating) || 0,

      dimensions: {
        length: Number(req.body.length) || 0,
        width: Number(req.body.width) || 0,
        height: Number(req.body.height) || 0,
      },

      weight: Number(req.body.weight) || 0,

      tags: normalizeArray(req.body.tags),

      user: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: productItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { gender, category, search } = req.query;
    const filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    const products = await productModel.find(filter);

    res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const products = await productModel.find({
      user: req.user._id,
    });

    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getShorts = async (req, res) => {
  try {
    const products = await productModel.find({
      "shorts.0": { $exists: true },
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Only the owner or admin can delete
    if (product.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await productModel.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = {
      user: req.user._id,
      name: req.user.fullName,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
  getShorts,
  deleteProduct,
  createReview,
};


