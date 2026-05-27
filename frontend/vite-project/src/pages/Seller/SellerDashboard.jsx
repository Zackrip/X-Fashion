import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/my-products`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(res.data.products);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setDeletingId(productId);
      await axios.delete(`${API_URL}/api/products/${productId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Product deleted!");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} product{products.length !== 1 ? "s" : ""} listed</p>
        </div>
        <Link
          to="/seller/add-product"
          className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-60 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-medium">No products yet</p>
          <p className="text-sm mt-1 mb-6">Start by adding your first product</p>
          <Link to="/seller/add-product" className="bg-black text-white px-6 py-3 rounded-full text-sm">
            + Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item._id} className="border rounded-xl overflow-hidden group relative">

              {/* IMAGE */}
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* INFO */}
              <div className="p-3">
                <h2 className="font-semibold text-sm">{item.name}</h2>
                <p className="text-gray-500 text-sm">₹{item.price}</p>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  className="mt-3 w-full border border-red-400 text-red-500 text-xs py-2 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer disabled:opacity-50"
                >
                  {deletingId === item._id ? "Deleting..." : "🗑️ Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;