import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";

import Home from "../pages/User/Home";
import Cart from "../pages/User/Cart";
import ProfilePage from "../pages/User/ProfilePage";
import CollectionPage from "../pages/User/CollectionPage";
import MenCollectionPage from "../pages/User/MenCollectionPage";
import WomenCollectionPage from "../pages/User/WomenCollectionPage";
import SneakerCollectionPage from "../pages/User/SneakerCollectionPage";
import ProductPage from "../pages/User/ProductPage";

import UserLayout from "../components/Layout/UserLayout";
import { Toaster } from "sonner";
import ScrollToTop from "../components/Common/ScrollToTop";
import Checkout from "../pages/User/Checkout";
import Payment from "../pages/User/Payment";
import MyOrdersPage from "../pages/User/MyOrdersPage";
import AdminLayout from "../components/Layout/AdminLayout";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminProductsPage from "../pages/Admin/AdminProductsPage";
import { Navigate } from "react-router-dom";
import ProtectRoute from "../components/Common/ProtectRoute";
import TopProgressBar from "../components/Common/TopProgressBar";

import SellerDashboard from "../pages/Seller/SellerDashboard";
import AddProducts from "../pages/Seller/AddProduct";
import BecomeSeller from "../pages/User/BecomeSeller";
import SearchResultsPage from "../pages/User/SearchResultsPage";
import ReelsPage from "../pages/User/ReelsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <ScrollToTop />
      <TopProgressBar />

      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        <Route path="/" element={<Navigate to="/user/login" />} />

        {/* USER LAYOUT ROUTES */}
        <Route 
        element={ 
          <ProtectRoute allowedRoles={["user", "partner", "admin"]}>
            <UserLayout />
          </ProtectRoute>
        }>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<MyOrdersPage />} />

          {/* COLLECTION */}
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/men" element={<MenCollectionPage />} />
          <Route path="/collection/women" element={<WomenCollectionPage />} />
          <Route
            path="/collection/sneakers"
            element={<SneakerCollectionPage />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/payment" element={<Payment />} />

          {/* PRODUCT PAGE */}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>

        {/* REELS — full screen, outside layout */}
        <Route path="/reels" element={<ReelsPage />} />

        {/* Seller ROUTE */}

        <Route path="/seller" element={
          <ProtectRoute allowedRoles={["partner", "admin"]}>
            <SellerDashboard />
          </ProtectRoute>
        } />
        <Route path="/seller/add-product" element={
          <ProtectRoute allowedRoles={["partner", "admin"]}>
            <AddProducts />
          </ProtectRoute>
        } />

        {/* Admin Layout  */}
        <Route 
        path="/admin" 
        element={
          <ProtectRoute 
            allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectRoute>
        }>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="products" element={<AdminProductsPage />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-3xl">404 - Page not found</h1>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
