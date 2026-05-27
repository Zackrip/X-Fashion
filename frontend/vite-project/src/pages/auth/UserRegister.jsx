import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

export default function UserRegister() {
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        fullName,
        email,
        password,
      },
      { withCredentials: true },
    );
    const user = response.data.user;
    const token = response.data.token;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token); 

    if (user.role === "admin") navigate("/admin")
    else if (user.role === "partner") navigate("/seller")
    else navigate("/home");
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed")
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth-theme">
      <div className="w-full max-w-md mx-4">
        <div className="card p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Create account</h2>
          <p className="text-sm text-muted mb-6">
            Register as a User to explore products.
          </p>

          <form className="space-y-4" onSubmit={handlerSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm mb-1">
                Full name
              </label>
              <input
                className="input"
                id="fullName"
                name="fullName"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <button
              className="btn-primary w-full mt-2 cursor-pointer"
              type="submit"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted">Already have an account? </span>
            <Link to="/user/login" className="link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
