import React, { useEffect, useRef, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import FilterSideBar from "../../components/products/FilterSideBar";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MenCollectionPage = () => {
  const filterRef = useRef(null);
  const [productData, setProductData] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products?gender=Men`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProductData(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsFilterOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row ">
        <button
          onClick={toggleFilter}
          className="lg:hidden border p-2 flex justify-end items-center"
        >
          <LuSettings2 className="w-6 h-6" /> Filters
        </button>

        <div
          ref={filterRef}
          className={`${isFilterOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
        >
          <FilterSideBar />
        </div>

        <div className="flex-grow p-4">
          <h1 className="text-2xl uppercase font-semibold">Men's Collection</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {productData?.map((item) => (
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
        </div>
      </div>
    </div>
  );
};

export default MenCollectionPage;
