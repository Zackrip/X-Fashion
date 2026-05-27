import React from "react";
import { useSelector } from "react-redux";
import { BsCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaTruckFast, FaArrowRotateRight } from "react-icons/fa6";
import CartContents from "../../components/Cart/CartContents";

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-6 py-8 md:py-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">MY SHOPPING CART</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <BsCartFill className="text-9xl text-gray-500" />
          <p className="text-gray-600 text-2xl mt-4 font-bold">
            Your cart is empty
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
          <CartContents />

          <div className="p-4 md:p-6 lg:col-span-1">
            <div className="border border-gray-400 px-4 py-3 mb-4">
              <p className="flex items-center justify-center gap-2 text-green-600 font-bold">
                <FaTruckFast /> Free Shipping
              </p>
            </div>

            <div className="border border-gray-400 px-4 py-3 mb-4">
              <p className="flex items-center justify-center gap-2 text-gray-600 font-bold">
                <FaArrowRotateRight /> Free Returns
              </p>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">SUMMARY</h2>

            <div className="font-bold text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 mt-6 rounded-full hover:bg-gray-800 transition cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;