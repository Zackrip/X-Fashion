import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm.trim()}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-200 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          className="relative flex justify-center items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="relative flex w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-black cursor-pointer"
            >
              <CiSearch className="w-6 h-6"/>
            </button>
          </div>
          <button type="button" onClick={handleSearchToggle} className="absolute right-2 text-gray-700 hover:text-black cursor-pointer">
            <RxCross2 className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <CiSearch className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
