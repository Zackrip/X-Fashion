import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("price", e.target.price.value);
    formData.append("category", e.target.category.value);
    formData.append("description", e.target.description.value);
    formData.append("sku", e.target.sku.value);
    formData.append("sizes", e.target.sizes.value);
    formData.append("brand", e.target.brand.value);
    formData.append("colors", e.target.colors.value);
    formData.append("gender", e.target.gender.value);
    formData.append("collections", e.target.collections.value);
    formData.append("countInStock", e.target.countInStock.value);

    // image (required)
    if (e.target.images.files[0]) {
      formData.append("images", e.target.images.files[0]);
    }

    // short video (optional)
    if (e.target.shorts.files[0]) {
      formData.append("shorts", e.target.shorts.files[0]);
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/products`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Product added successfully!");
      navigate("/seller");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Product Name" required className="w-full border p-3 rounded-lg" />
        <input name="price" placeholder="Price (₹)" type="number" required className="w-full border p-3 rounded-lg" />

        <select name="category" required className="w-full border p-3 rounded-lg">
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Sneakers">Sneakers</option>
        </select>

        <input name="description" placeholder="Description" required className="w-full border p-3 rounded-lg" />
        <input name="sku" placeholder="SKU (unique)" required className="w-full border p-3 rounded-lg" />
        <input name="brand" placeholder="Brand" className="w-full border p-3 rounded-lg" />

        <select name="sizes" required className="w-full border p-3 rounded-lg">
          <option value="">Select Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>

        <select name="colors" required className="w-full border p-3 rounded-lg">
          <option value="">Select Color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>

        <select name="gender" required className="w-full border p-3 rounded-lg">
          <option value="Men">Men</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>

        <select name="collections" required className="w-full border p-3 rounded-lg">
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Autumn">Autumn</option>
          <option value="Spring">Spring</option>
        </select>

        <input name="countInStock" placeholder="Count In Stock" type="number" required className="w-full border p-3 rounded-lg" />

        {/* Product Image */}
        <div className="border-2 border-dashed rounded-lg p-4">
          <p className="text-sm font-semibold mb-1">Product Image <span className="text-red-500">*</span></p>
          <input type="file" name="images" accept="image/*" required />
        </div>

        {/* Short Video for Reels */}
        <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 bg-purple-50">
          <p className="text-sm font-semibold mb-1 text-purple-700">🎬 Short Video for Reels <span className="text-gray-400 font-normal">(optional)</span></p>
          <p className="text-xs text-purple-500 mb-2">Upload a 15-30 sec video showcasing your product. It will appear on the Reels page!</p>
          <input type="file" name="shorts" accept="video/*" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-full font-semibold transition cursor-pointer ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Uploading...
            </span>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;