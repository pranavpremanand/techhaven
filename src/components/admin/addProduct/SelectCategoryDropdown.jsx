"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const categories = ["Electronics & Gadgets"];

const SelectCategoryDropdown = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (category) => {
    onChange(category);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1 relative" ref={dropdownRef}>
      <label className="text-sm">Category</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`border p-2 border-white/70 rounded-lg w-full text-white bg-transparent cursor-pointer flex justify-between items-center ${
          error ? "border-red-500" : ""
        }`}
      >
        <span>{value || "Select Category"}</span>
        <FaChevronDown
          className={`text-white text-sm transition-all duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-black rounded-lg shadow text-white border border-white/30 max-h-60 overflow-auto">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(category)}
              className={`px-4 py-2 hover:bg-white/10 cursor-pointer rounded ${
                value === category ? "bg-white/10" : ""
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      )}
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
};

export default SelectCategoryDropdown;
