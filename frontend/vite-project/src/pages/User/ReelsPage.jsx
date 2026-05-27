import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/cartSlice";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

// Single Reel Card with autoplay on scroll into view
const ReelCard = ({ product }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    console.log("Product shorts URL:", product.shorts?.[0]?.url);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.7 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
        quantity: 1,
      })
    );
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 snap-start bg-black overflow-hidden w-full h-full"
    >
      {/* VIDEO or FALLBACK */}
      {!videoError && product.shorts?.[0]?.url ? (
        <video
          ref={videoRef}
          src={product.shorts[0].url}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          autoPlay
          onError={() => setVideoError(true)}
        />
      ) : (
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      )}

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* TOP — product link */}
      <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
        <Link to={`/product/${product._id}`}>
          <span className="text-white text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            View Product →
          </span>
        </Link>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="absolute right-4 bottom-40 flex flex-col items-center gap-6">
        {/* Mute toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-white text-2xl bg-white/20 backdrop-blur-sm p-3 rounded-full"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* Like */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center text-white"
        >
          <span className="text-3xl">{isLiked ? "❤️" : "🤍"}</span>
          <span className="text-xs mt-1">Like</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center text-white">
          <span className="text-2xl bg-white/20 backdrop-blur-sm p-3 rounded-full">↗</span>
          <span className="text-xs mt-1">Share</span>
        </button>
      </div>

      {/* BOTTOM — product info + cart */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* short title if exists */}
        {product.shorts?.[0]?.title && (
          <p className="text-white/70 text-sm mb-1">{product.shorts[0].title}</p>
        )}

        <h2 className="text-white text-xl font-bold">{product.name}</h2>

        <div className="flex items-center gap-2 mt-1 mb-3">
          {product.brand && (
            <span className="text-white/60 text-sm">{product.brand}</span>
          )}
          <span className="text-white/40 text-sm">•</span>
          <span className="text-white/60 text-sm">{product.gender}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white text-2xl font-bold">₹{product.price}</span>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              added
                ? "bg-green-500 text-white scale-95"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {added ? "✓ Added!" : "Add to Cart 🛒"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Reels Page
const ReelsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/shorts`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-4 animate-pulse">🎬</div>
          <p className="text-lg">Loading Reels...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center px-8">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">No Reels Yet</h2>
          <p className="text-white/60 text-sm">
            Sellers haven't uploaded any product shorts yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">

      {/* HOME BUTTON — top left */}
      <Link
        to="/home"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition"
      >
        ← Home
      </Link>

      {/* Mobile-width portrait container */}
      <div
        className="relative h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ width: "min(100vw, 400px)" }}
      >
        {products.map((product) => (
          <ReelCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ReelsPage;
