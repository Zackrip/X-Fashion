import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { IoBagOutline } from "react-icons/io5";
import { HiBars3BottomLeft } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { RxCross2 } from "react-icons/rx";
import Profile from "./ProfileMenu";
import { LuBadgeHelp } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Logo from "./Logo";
import { useSelector } from "react-redux";

const safeGetUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { localStorage.removeItem("user"); return null; }
};

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const user = safeGetUser();

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const closeDrawer = () => setNavDrawerOpen(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    closeDrawer();
    navigate("/user/login");
  };

  // Sidebar rendered via portal to avoid fixed+transform parent clipping issue
  const sidebar = (
    <>
      {/* DARK BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/50 z-[998] transition-opacity duration-300
          ${navDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeDrawer}
      />

      {/* SIDEBAR */}
      <div className={`fixed left-0 top-0 w-3/4 sm:w-72 h-full bg-white shadow-2xl z-[999]
        transform transition-transform duration-300
        ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
              {user?.fullName?.[0]?.toUpperCase() || "G"}
            </div>
            <div>
              <p className="font-semibold text-sm">{user?.fullName || "Guest"}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role || ""}</p>
            </div>
          </div>
          <button onClick={closeDrawer} className="p-2 rounded-full hover:bg-gray-100 transition">
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-[calc(100%-70px)]">

          {/* SHOP */}
          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Shop</p>
          <nav className="space-y-1 mb-6">
            <Link to="/collection" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">All Products</Link>
            <Link to="/collection/men" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">Mens</Link>
            <Link to="/collection/women" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">Womens</Link>
            <Link to="/collection/sneakers" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">Bottom Wear</Link>
          </nav>

          {/* ACCOUNT */}
          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Account</p>
          <nav className="space-y-1 mb-6">
            <Link to="/profile" onClick={closeDrawer} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">
              <CgProfile className="h-5 w-5 text-gray-500" /> My Profile
            </Link>
            <Link to="/orders" onClick={closeDrawer} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">
              <BsBoxSeam className="h-5 w-5 text-gray-500" /> My Orders
            </Link>
            <Link to="/favourites" onClick={closeDrawer} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">
              <FaRegHeart className="h-5 w-5 text-gray-500" /> Favourites
            </Link>
            <Link to="/help" onClick={closeDrawer} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">
              <LuBadgeHelp className="h-5 w-5 text-gray-500" /> Help
            </Link>
          </nav>

          {/* SELLER LINKS */}
          {user?.role === "partner" && (
            <>
              <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Seller</p>
              <nav className="space-y-1 mb-6">
                <Link to="/seller" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">Seller Dashboard</Link>
                <Link to="/seller/add-product" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">Add Product</Link>
              </nav>
            </>
          )}

          {/* ADMIN LINKS */}
          {user?.role === "admin" && (
            <>
              <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Admin</p>
              <nav className="space-y-1 mb-6">
                <Link to="/admin" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 font-medium">Admin Dashboard</Link>
              </nav>
            </>
          )}

          {/* BECOME SELLER */}
          {user?.role === "user" && user?.sellerStatus === "none" && (
            <Link to="/become-seller" onClick={closeDrawer} className="block px-3 py-2.5 rounded-lg hover:bg-blue-50 text-blue-600 font-medium mb-4">
              Become a Seller
            </Link>
          )}

          {/* LOGOUT */}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-500 font-medium">
            <MdLogout className="h-5 w-5" /> Logout
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <nav className="z-50 bg-transparent container mx-auto flex items-center justify-between h-16 px-6">

        {/* LOGO */}
        <Link to="/home" className="flex items-center">
          <Logo />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex ml-20 space-x-6">
          <Link to="/collection" className="uppercase text-gray-700 hover:text-black text-sm font-medium">all</Link>
          <Link to="/collection/men" className="uppercase text-gray-700 hover:text-black text-sm font-medium">men</Link>
          <Link to="/collection/women" className="uppercase text-gray-700 hover:text-black text-sm font-medium">women</Link>
          <Link to="/collection/sneakers" className="uppercase text-gray-700 hover:text-black text-sm font-medium">bottom wear</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">
          {user?.role === "admin" && (
            <Link to="/admin" className="hidden md:block px-2 py-1 bg-black text-white text-sm rounded-3xl">Admin</Link>
          )}
          <Profile />
          <Link to="/Cart">
            <button className="relative hover:text-black text-gray-700 cursor-pointer">
              <IoBagOutline className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute px-1.5 py-0.5 -top-1 -right-1 text-xs text-white rounded-full bg-gray-700 min-w-[18px] text-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          {/* Hamburger — mobile only */}
          <button onClick={toggleNavDrawer} className="md:hidden text-gray-700 hover:text-black">
            <HiBars3BottomLeft className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Render sidebar via portal — outside the transformed header */}
      {createPortal(sidebar, document.body)}
    </>
  );
};

export default Navbar;
