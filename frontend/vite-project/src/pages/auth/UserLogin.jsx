import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
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
      toast.error(error.response?.data?.message || "Login failed");
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

          <p className="text-sm text-gray-400 mb-1">Welcome back!</p>
          <h2 className="text-3xl font-bold text-black mb-8">Sign In</h2>

          <form onSubmit={handlerSubmit} className="space-y-5">

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
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-gray-400 cursor-pointer hover:text-black transition">
                  Forgot Password?
                </span>
              </div>
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
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/user/register" className="text-black font-semibold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT — HERO IMAGE */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="/hero_fashion.png"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Text on top */}
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <h3 className="text-3xl font-black uppercase leading-tight mb-3">
            Find Clothes<br />That Match<br />Your Style
          </h3>
          <p className="text-white/70 text-sm">
            Thousands of fashion items from top brands, all in one place.
          </p>
        </div>
      </div>

    </div>
  );
}
