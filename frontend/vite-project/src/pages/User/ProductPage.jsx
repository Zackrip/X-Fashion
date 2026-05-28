import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/cartSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const StarRating = ({ rating = 4 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`w-4 h-4 ${s <= Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.084 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

const InteractiveStar = ({ rating, setRating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} type="button" onClick={() => setRating(s)} className="cursor-pointer">
        <svg className={`w-7 h-7 transition ${s <= rating ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.084 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      </button>
    ))}
  </div>
);

const TABS = ["Product Details", "Rating & Reviews", "FAQs"];

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Rating & Reviews");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setMainImage(res.data.product.images?.[0]?.url);
        setSelectedColor(res.data.product.colors?.[0] || null);
        setSelectedSize(null);
        setLoading(false);
      })
      .catch(() => { toast.error("Failed to load product"); setLoading(false); });
  }, [id]);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then((res) => setRelatedProducts(res.data.products.filter((p) => p._id !== id).slice(0, 4)))
      .catch(() => {});
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) { toast.error("Please write a comment"); return; }
    try {
      setSubmittingReview(true);
      await axios.post(
        `${API_URL}/api/products/${id}/reviews`,
        { rating: reviewRating, comment: reviewComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, withCredentials: true }
      );
      toast.success("Review submitted!");
      setShowReviewModal(false);
      setReviewComment("");
      setReviewRating(5);
      // Refresh product to get new review
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error("Please select a size"); return; }
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: Number(product.price),
      image: product.images?.[0]?.url,
      imageUrl: product.images?.[0]?.url,
      size: selectedSize,
      color: selectedColor,
      quantity,
    }));
    toast.success("Added to cart!");
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">{[1,2,3].map(i => <div key={i} className="w-20 h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>
          <div className="flex-1 h-[500px] bg-gray-100 rounded-2xl animate-pulse" />
        </div>
        <div className="space-y-4">{[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
      </div>
    </div>
  );

  if (!product) return <div className="p-10 text-center text-gray-400">Product not found</div>;

  const colors = product.colors || [];
  const sizes = product.sizes || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/home" className="hover:text-black transition">Home</Link>
          <span>›</span>
          <Link to="/collection" className="hover:text-black transition">Shop</Link>
          <span>›</span>
          <Link to={`/collection/${product.gender}`} className="hover:text-black transition capitalize">{product.gender}</Link>
          <span>›</span>
          <span className="text-black font-medium">{product.name}</span>
        </nav>

        {/* PRODUCT SECTION */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* LEFT — IMAGES */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img.url)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition
                    ${mainImage === img.url ? "border-black" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <img src={img.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-[480px] object-contain p-4"
              />
            </div>
          </div>

          {/* RIGHT — INFO */}
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={4} />
              <span className="text-sm text-gray-500">4.5/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">₹{product.price}</span>
              <span className="text-gray-400 line-through text-lg">₹{Math.round(product.price * 1.2)}</span>
              <span className="bg-red-100 text-red-500 text-xs font-semibold px-2 py-1 rounded-full">-20%</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6 border-b pb-6">
              {product.description || "A premium quality product crafted for comfort and style. Perfect for any occasion, this piece combines modern design with everyday wearability."}
            </p>

            {/* COLORS */}
            {colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Colors</h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-9 h-9 rounded-full border-2 transition relative
                        ${selectedColor === color ? "border-black scale-110" : "border-transparent hover:border-gray-300"}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2 rounded-full text-sm border transition
                        ${selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY + ADD TO CART */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-xl font-light text-gray-500 hover:text-black transition cursor-pointer w-6 text-center"
                >−</button>
                <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-xl font-light text-gray-500 hover:text-black transition cursor-pointer w-6 text-center"
                >+</button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 rounded-full text-sm font-semibold
                  hover:bg-gray-800 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b border-gray-200 flex gap-8 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition border-b-2 -mb-px
                ${activeTab === tab ? "border-black text-black" : "border-transparent text-gray-400 hover:text-gray-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {activeTab === "Product Details" && (
          <div className="text-sm text-gray-600 space-y-3 mb-16">
            <p><span className="font-semibold text-black">Brand:</span> {product.brand || "X-Fashions"}</p>
            <p><span className="font-semibold text-black">Category:</span> {product.category}</p>
            <p><span className="font-semibold text-black">Gender:</span> <span className="capitalize">{product.gender}</span></p>
            <p><span className="font-semibold text-black">Stock:</span> {product.countInStock} units available</p>
            <p><span className="font-semibold text-black">Description:</span> {product.description || "Premium quality product."}</p>
          </div>
        )}

        {activeTab === "Rating & Reviews" && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                All Reviews{" "}
                <span className="text-gray-400 font-normal text-base">
                  ({product.reviews?.length || 0})
                </span>
              </h2>
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            {product.reviews?.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-4xl mb-3">⭐</p>
                <p>No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {product.reviews.map((review, i) => (
                  <div key={i} className="border border-gray-100 rounded-2xl p-5">
                    <StarRating rating={review.rating} />
                    <p className="font-semibold text-sm mt-2 mb-1">{review.name} <span className="text-green-500">✓</span></p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">"{review.comment}"</p>
                    <p className="text-xs text-gray-300">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "FAQs" && (
          <div className="text-sm text-gray-600 space-y-4 mb-16">
            {[
              { q: "What is the return policy?", a: "We offer free returns on all qualifying orders within 30 days of purchase." },
              { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping is available at checkout." },
              { q: "Is this product available in other colors?", a: "Yes! Check the color selector above for all available options." },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-black mb-1">{faq.q}</p>
                <p className="text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* RELATED PRODUCTS */}
        <div>
          <h2 className="text-2xl font-black uppercase mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Link key={item._id} to={`/product/${item._id}`} className="group">
                <div className="bg-gray-50 rounded-2xl overflow-hidden mb-3 aspect-square">
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-semibold text-sm">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={4} />
                  <span className="text-xs text-gray-400">4/5</span>
                </div>
                <p className="font-bold text-sm mt-1">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* WRITE REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Write a Review</h2>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-black text-2xl cursor-pointer">×</button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Your Rating</p>
                <InteractiveStar rating={reviewRating} setRating={setReviewRating} />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">Your Review</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  rows={4}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition cursor-pointer disabled:opacity-60"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductPage;
