import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/cartSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // ✅ STATES
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PRODUCT
  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data.product);
        setMainImage(res.data.product.images?.[0]?.url);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  // ✅ FETCH RELATED PRODUCTS
  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const filtered = res.data.products.filter((p) => p._id !== id);
        setRelatedProducts(filtered.slice(0, 6)); // limit
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load related products");
      });
  }, [id]);

  // ✅ ADD TO CART
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Select size & color first");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.images?.[0]?.url,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      }),
    );

    toast.success("Added to cart!");
  };

  // ✅ LOADING UI
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const colors = product.colors || [];
  const sizes = product.sizes || [];

  return (
    <div className="bg-white min-h-screen px-6 md:px-12 py-10">
      {/* 🔥 PRODUCT SECTION */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT: IMAGES */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt="thumb"
                onClick={() => setMainImage(img.url)}
                className="w-20 h-20 object-cover cursor-pointer border rounded"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={mainImage || "/placeholder.png"}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-xl font-semibold mb-6">₹{product.price}</p>

          {/* COLORS */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Color</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border ${
                    selectedColor === color ? "bg-black text-white" : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-full"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔥 RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Related Products</h2>

        <div className="flex gap-6 overflow-x-auto">
          {relatedProducts.map((item) => (
            <Link key={item._id} to={`/product/${item._id}`}>
              <div className="min-w-[200px]">
                <img
                  src={item.images?.[0]?.url}
                  className="h-[200px] w-[200px] object-cover rounded"
                />
                <p className="mt-2 font-medium">{item.name}</p>
                <p className="text-gray-500">₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
