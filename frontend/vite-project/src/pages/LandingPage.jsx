import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein", "H&M", "LEVI'S", "NIKE", "ADIDAS", "BURBERRY"];

const LandingPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in on mount
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleShopNow = () => {
    const user = localStorage.getItem("user");
    navigate(user ? "/home" : "/user/login");
  };

  return (
    <div className="min-h-screen bg-[#f2f0eb] flex flex-col overflow-hidden">

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-white text-xs text-center py-2.5 px-4">
        Sign up and get 20% off your first order.{" "}
        <span
          onClick={() => navigate("/user/register")}
          className="underline font-semibold cursor-pointer hover:text-gray-300"
        >
          Sign Up Now
        </span>
      </div>

      {/* MAIN HERO */}
      <div className="flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-6 lg:px-16 py-10 lg:py-0 gap-8 lg:gap-0">

        {/* LEFT — TEXT */}
        <div
          className={`flex-1 z-10 transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          {/* Decorative star */}
          <div className="text-black mb-4 hidden lg:block">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-black uppercase mb-6">
            Find Clothes<br />
            That Match<br />
            <span className="text-gray-700">Your Style</span>
          </h1>

          <p className="text-gray-500 text-sm lg:text-base max-w-sm mb-8 leading-relaxed">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>

          <button
            onClick={handleShopNow}
            className="bg-black text-white px-10 py-4 rounded-full text-sm font-semibold
              hover:bg-gray-800 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Shop Now
          </button>

          {/* STATS */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-gray-300">
            <div>
              <p className="text-2xl lg:text-3xl font-black text-black">0+</p>
              <p className="text-xs text-gray-500 mt-1">International Brands</p>
            </div>
            <div className="border-l border-gray-300 pl-8">
              <p className="text-2xl lg:text-3xl font-black text-black">0+</p>
              <p className="text-xs text-gray-500 mt-1">High-Quality Products</p>
            </div>
            <div className="border-l border-gray-300 pl-8">
              <p className="text-2xl lg:text-3xl font-black text-black">0+</p>
              <p className="text-xs text-gray-500 mt-1">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div
          className={`flex-1 flex justify-center lg:justify-end relative transition-all duration-700 ease-out delay-200
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          {/* Decorative star top right */}
          <div className="absolute top-4 right-4 text-black hidden lg:block">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
          </div>
          {/* Decorative star middle left */}
          <div className="absolute top-1/2 left-0 text-black hidden lg:block">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
          </div>

          <img
            src="/hero_fashion.png"
            alt="Fashion models"
            className="w-full max-w-sm lg:max-w-lg xl:max-w-xl object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* BRAND STRIP — Infinite Scroll */}
      <div className="bg-black py-5 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {/* Duplicate for seamless loop */}
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-white font-bold text-sm md:text-lg tracking-widest opacity-80 hover:opacity-100 transition-opacity cursor-default mx-10 shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
