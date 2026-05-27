import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "../../Store/cartSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.price) * (item.quantity || 1);
  }, 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
    if (!shippingInfo) {
      toast.error("Shipping info missing. Please go back to checkout.");
      navigate("/checkout");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/api/orders`,
        {
          items: cartItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            size: item.size,
            color: item.color,
            image: item.image || item.imageUrl,
          })),
          shippingInfo,
          paymentMethod: method,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      dispatch(clearCart());
      localStorage.removeItem("shippingInfo");
      toast.success("Order placed successfully!");
      navigate("/orders");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">Payment</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT - PAYMENT OPTIONS */}
        <div className="space-y-4">

          {/* CARD */}
          <div
            onClick={() => setMethod("card")}
            className={`border-2 p-4 rounded-xl cursor-pointer transition ${method === "card" ? "border-black" : "border-gray-200 hover:border-gray-400"}`}
          >
            <h2 className="font-semibold">Credit / Debit Card</h2>
            {method === "card" && (
              <div className="mt-4 space-y-3">
                <input type="text" placeholder="Card Number" className="w-full border p-2 rounded-lg" />
                <div className="flex gap-4">
                  <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded-lg" />
                  <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* UPI */}
          <div
            onClick={() => setMethod("upi")}
            className={`border-2 p-4 rounded-xl cursor-pointer transition ${method === "upi" ? "border-black" : "border-gray-200 hover:border-gray-400"}`}
          >
            <h2 className="font-semibold">UPI</h2>
            {method === "upi" && (
              <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full border p-2 mt-3 rounded-lg" />
            )}
          </div>

          {/* COD */}
          <div
            onClick={() => setMethod("cod")}
            className={`border-2 p-4 rounded-xl cursor-pointer transition ${method === "cod" ? "border-black" : "border-gray-200 hover:border-gray-400"}`}
          >
            <h2 className="font-semibold">Cash on Delivery</h2>
            {method === "cod" && (
              <p className="text-sm text-gray-500 mt-2">Pay when your order is delivered.</p>
            )}
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="border p-6 rounded-2xl h-fit shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          {/* Items */}
          <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3">
                <img src={item.image || item.imageUrl} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity} · {item.size}</p>
                </div>
                <p className="text-sm font-semibold">₹{item.price * (item.quantity || 1)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span className="text-green-500">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full py-4 mt-6 rounded-full font-semibold transition cursor-pointer
              ${loading ? "bg-gray-400 text-white" : "bg-black text-white hover:bg-gray-800"}`}
          >
            {loading ? "Placing Order..." : `Pay ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;