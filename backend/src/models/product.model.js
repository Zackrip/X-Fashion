const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  images: [
    {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
      },
    },
  ],

  videos: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],

  shorts: [
    {
      url: {
        type: String,
        required: true,
      },
      title: {
        type: String,
      },
    },
  ],

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountPrice: {
    type: Number,
  },

  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },

  sku: {
    type: String,
    required: true,
    unique: true,
  },

  category: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
  },

  sizes: {
    type: [String],
    required: true,
    enum: ["S", "M", "L", "XL", "XXL"],
  },

  colors: {
    type: [String],
    required: true,
    enum: ["red", "blue", "green", "yellow", "black", "white"],
  },

  collections: {
    type: [String],
    required: true,
    enum: ["Summer", "Winter", "Spring", "Autumn"],
  },

  materials: {
    type: String,
  },

  gender: {
    type: String,
    required: true,
    enum: ["Men", "Female", "Unisex"],
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  isPublished: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  tags: {
    type: [String],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  metaTitle: {
    type: String,
  },

  metaDescription: {
    type: String,
  },

  metaKeywords: {
    type: String,
  },

  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },

  weight: {
    type: Number,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
