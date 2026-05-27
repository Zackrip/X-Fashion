import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Under Armour",
    "New Balance",
    "Asics",
    "Converse",
    "Vans",
    "Fila",
  ];
  const categories = ["Shoes", "Jackets", "TShirts", "Jeans", "Accessories"];

  const [searchParams, setSearchParams] = useSearchParams();
  const [Filters, setFilters] = useState({
    category: [],
    price: "",
    color: [],
    size: [],
    brand: [],
  });

  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState(["Black"]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category ? params.category.split(",") : [],
      price: params.price || "",
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
    });
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFilters = { ...Filters };

    if (type === "checkbox") {
      if (checked) {
        updatedFilters[name] = [...(updatedFilters[name] || []), value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter(
          (item) => item !== value,
        );
      }
    } else {
      updatedFilters[name] = value;
    }
    setFilters(updatedFilters);
    console.log(updatedFilters);
    updateUrlWithFilters(updatedFilters);
  };

  const updateUrlWithFilters = (updatedFilters) => {
    const params = new URLSearchParams();
    Object.keys(updatedFilters).forEach((key) => {
      if (
        Array.isArray(updatedFilters[key]) &&
        updatedFilters[key].length > 0
      ) {
        params.set(key, updatedFilters[key].join(","));
      } else if (updatedFilters[key]) {
        params.append(key, updatedFilters[key]);
      }
    });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    console.log("Filters cleared");
  };
  return (
    <div>
      <div className="w-full p-6  bg-white border-r h-min-screen overflow-y-auto">
        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Filters</h2>

        {/* CATEGORY */}
        <div className="mb-6 ">
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2 text-gray-700">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  onChange={handleFilterChange}
                  checked={Filters.category.includes(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="mb-6 w-full">
          <h3 className="font-semibold mb-3">Price</h3>

          <input type="range" min="0" max="20000" className="w-full" />

          <div className="flex justify-between text-sm mt-2">
            <span>₹0</span>
            <span>₹20000</span>
          </div>
        </div>

        {/* COLOR */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Color</h3>

          <div className="flex gap-3 ">
            <span
              className="w-6 h-6 rounded-full bg-black cursor-pointer hover:scale-105"
              onClick={() => setSelectedColors("Black")}
            ></span>
            <span
              className="w-6 h-6 rounded-full bg-red-500 cursor-pointer hover:scale-105"
              onClick={() => setSelectedColors("Red")}
            ></span>
            <span
              className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer hover:scale-105"
              onClick={() => setSelectedColors("Blue")}
            ></span>
            <span
              className="w-6 h-6 rounded-full bg-green-500 cursor-pointer hover:scale-105"
              onClick={() => setSelectedColors("Green")}
            ></span>
          </div>
        </div>

        {/* SIZE */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Size</h3>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                name="size"
                onClick={() => setSelectedSizes(size)}
                value={size}
                onClickCapture={handleFilterChange}
                checked={Filters.size.includes(size)}
                className={`border px-3 py-1 transition cursor-pointer ${
                  selectedSizes === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* BRAND */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Brand</h3>

          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  onChange={handleFilterChange}
                  checked={Filters.brand.includes(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* CLEAR BUTTON */}
        <button
          className="w-full border py-2 rounded hover:bg-black hover:text-white transition cursor-pointer"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSideBar;
