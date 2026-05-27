import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios
      .get(`${API_URL}/api/products?search=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Search results for <span className="italic">"{query}"</span>
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        {loading ? "Searching..." : `${products.length} result${products.length !== 1 ? "s" : ""} found`}
      </p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-60 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-2">Try searching for something else</p>
          <Link to="/collection" className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-full text-sm">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item._id} className="p-3 rounded-lg">
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded"
                />
                <div className="flex items-center justify-between font-semibold mt-2">
                  <h2>{item.name}</h2>
                  <p>₹{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
