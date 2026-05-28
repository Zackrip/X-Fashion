import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        { fullName, email, password },
        { withCredentials: true }
      );
      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "partner") navigate("/seller");
      else navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT — FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-2xl font-black tracking-tight text-black">X-FASHIONS</h1>
          </Link>

          <p className="text-sm text-gray-400 mb-1">Start your journey!</p>
          <h2 className="text-3xl font-bold text-black mb-8">Create Account</h2>

          <form onSubmit={handlerSubmit} className="space-y-5">

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-semibold
                hover:bg-gray-800 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60 mt-2"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/user/login" className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT — BLACK PANEL */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full border border-white/10" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5" />

        <div className="relative z-10 text-center px-12">
          <img
            src="/auth_illustration.png"
            alt="Fashion shopping"
            className="w-72 mx-auto mb-8 invert"
          />
          <h3 className="text-white text-2xl font-bold mb-3">Join X-Fashions</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            Create your account and unlock access to exclusive styles, deals and our unique ShopReels experience.
          </p>
        </div>

      </div>

    </div>
  );
}
