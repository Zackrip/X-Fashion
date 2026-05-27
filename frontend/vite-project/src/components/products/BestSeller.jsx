import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const BestSeller = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProducts(res.data.products.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="bg-white text-black py-13 px-8">
      <h1 className="text-xl font-semibold mb-6">Best Seller</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`}>
              <div className="h-[250px] bg-gray-100 overflow-hidden rounded">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between mt-3 font-semibold">
                <p>{product.name}</p>
                <p>₹{product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller