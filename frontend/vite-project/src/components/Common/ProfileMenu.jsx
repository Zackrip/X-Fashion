import React, { useState, useEffect, useRef } from 'react'
import { User, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dropdownRef = useRef(null);

  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/auth/logout`, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  };

  return (
    <div ref={dropdownRef} className="relative hidden md:block">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-gray-700 cursor-pointer hover:text-black gap-2"
      >
        <h1 className="text-sm">Hi, {user?.fullName?.split(" ")[0] || "Guest"}</h1>
        <User size={22} />
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-72 bg-white rounded-3xl shadow-xl p-6 z-50">

          <h2 className="text-2xl font-semibold mb-1">
            Hi {user?.fullName?.split(" ")[0] || "Guest"} 👋
          </h2>
          <p className="text-xs text-gray-400 mb-4 capitalize">{user?.role}</p>

          <hr className="mb-4" />

          <div className="flex justify-between items-center py-3 cursor-pointer hover:text-gray-600">
            <Link to="/orders" onClick={close} className="flex items-center justify-between w-full">
              <span>My Orders</span>
              <ShoppingBag size={20} />
            </Link>
          </div>

          <div className="flex justify-between items-center py-3 cursor-pointer hover:text-gray-600">
            <Link to="/profile" onClick={close} className="flex items-center justify-between w-full">
              <span>My Profile</span>
              <User size={20} />
            </Link>
          </div>

          {user?.role === "admin" && (
            <div className="flex justify-between items-center py-3 cursor-pointer hover:text-gray-600">
              <Link to="/admin" onClick={close} className="flex items-center justify-between w-full">
                <span>Admin Dashboard</span>
              </Link>
            </div>
          )}

          {user?.role === "partner" && (
            <div className="flex justify-between items-center py-3 cursor-pointer hover:text-gray-600">
              <Link to="/seller" onClick={close} className="flex items-center justify-between w-full">
                <span>Seller Dashboard</span>
              </Link>
            </div>
          )}

          {user?.role === "user" && user?.sellerStatus === "none" && (
            <div className="flex justify-between items-center py-3 cursor-pointer hover:text-gray-600">
              <Link to="/become-seller" onClick={close} className="flex items-center justify-between w-full">
                <span>Become a Seller</span>
              </Link>
            </div>
          )}

          {user?.role === "user" && user?.sellerStatus === "pending" && (
            <div className="flex justify-between items-center py-3">
              <span className="text-yellow-600 text-sm">⏳ Seller Application Pending</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="mt-5 w-full border border-gray-400 rounded-full py-3 hover:bg-black hover:text-white transition cursor-pointer"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  )
}

export default Profile