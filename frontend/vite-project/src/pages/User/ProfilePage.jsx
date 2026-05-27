import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        toast.error("Session expired. Please login again.");
        navigate("/user/login");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/user/login");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };


  const roleBadge = {
    admin: { label: "Admin 👑", bg: "bg-purple-100 text-purple-700" },
    partner: { label: "Seller 🏪", bg: "bg-green-100 text-green-700" },
    user: { label: "Customer", bg: "bg-gray-100 text-gray-600" },
  };

  const sellerStatusBadge = {
    pending: { label: "⏳ Application Pending", bg: "bg-yellow-100 text-yellow-700" },
    approved: { label: "✅ Seller Approved", bg: "bg-green-100 text-green-700" },
    rejected: { label: "❌ Application Rejected", bg: "bg-red-100 text-red-700" },
    none: null,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-lg">Loading profile...</div>
      </div>
    );
  }

  const badge = roleBadge[user?.role] || roleBadge.user;
  const statusBadge = sellerStatusBadge[user?.sellerStatus] || null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-4">

        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center">

          <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold mb-4">
            {getInitials(user?.fullName)}
          </div>

          <h1 className="text-2xl font-bold">{user?.fullName}</h1>

          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

          <span className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg}`}>
            {badge.label}
          </span>

          {statusBadge && (
            <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.bg}`}>
              {statusBadge.label}
            </span>
          )}

          {user?.createdAt && (
            <p className="text-xs text-gray-400 mt-3">
              Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow divide-y">

          <Link to="/orders" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-xl">📦</span>
              <span className="font-medium">My Orders</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          {user?.role === "partner" && (
            <Link to="/seller" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏪</span>
                <span className="font-medium">Seller Dashboard</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <span className="text-xl">👑</span>
                <span className="font-medium">Admin Dashboard</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          )}

          {user?.role === "user" && user?.sellerStatus === "none" && (
            <Link to="/become-seller" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <span className="text-xl">🚀</span>
                <span className="font-medium">Become a Seller</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          )}

          {user?.role === "user" && user?.sellerStatus === "pending" && (
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">⏳</span>
                <span className="font-medium text-yellow-600">Seller Application Pending</span>
              </div>
            </div>
          )}

          <Link to="/reels" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎬</span>
              <span className="font-medium">Product Reels</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4 text-gray-700">Account Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Full Name</span>
              <span className="font-medium">{user?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Role</span>
              <span className="font-medium capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-medium text-gray-400 text-xs">{user?._id}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full border border-gray-300 rounded-full py-4 font-semibold hover:bg-black hover:text-white transition cursor-pointer"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;