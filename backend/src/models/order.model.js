const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  size: String,
  color: String,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingInfo: {
      firstName: String,
      lastName: String,
      address1: String,
      address2: String,
      city: String,
      pinCode: String,
      email: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "cod"],
      default: "cod",
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
