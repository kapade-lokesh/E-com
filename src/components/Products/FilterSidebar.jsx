import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const handleFilterChange = (e) => {
    const { name, type, value, checked } = e.target;

    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...newFilters[name], value];
       
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key])) {
        params.append(key, newFilters[key].join(","));
      } else {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handelPriceChange = (e) => {
    console.log("price change called");
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  };

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Morden Fit",
    "Street Style",
    "Beach Breeze",
    "Fashoinista",
    "ChicStyle",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });

    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* category */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          {" "}
          Category
        </label>
        {categories.map((category) => {
          return (
            <div key={category} className="flex items-center mb-1">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4  accent-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{category}</span>
            </div>
          );
        })}
      </div>

      {/* Genders */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2"> Gender</label>
        {genders.map((gender) => {
          return (
            <div key={gender} className="flex items-center mb-1">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={filters.gender === gender}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4  accent-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{gender}</span>
            </div>
          );
        })}
      </div>

      {/* colors  */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap mb-1 gap-3">
          {colors.map((color) => {
            return (
              <button
                key={color}
                name="color"
                value={color}
                onClick={handleFilterChange}
                style={{
                  backgroundColor: color.toLowerCase(),
                  filter: "brightness(0.8)",
                }}
                className={`mr-2 cursor-pointer h-8 w-8 rounded-full border ${
                  filters.color === color ? "border-3 border-blue-500" : ""
                }`}
              ></button>
            );
          })}
        </div>
      </div>

      {/* sizes */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => {
          return (
            <div key={size} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="size"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                className="mr-2 h-4 w-4  accent-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{size}</span>
            </div>
          );
        })}
      </div>

      {/* materials */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          {" "}
          Material
        </label>
        {materials.map((material) => {
          return (
            <div key={material} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="material"
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4  accent-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{material}</span>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => {
          return (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                name="brand"
                className="mr-2 h-4 w-4  accent-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>

        <input
          type="range"
          name=""
          min={0}
          max={100}
          id=""
          value={priceRange[1]}
          onChange={handelPriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg text-blue-500 appearance-none cursor-pointer "
        />

        <div className="flex justify-between text-gray-700 mt-2">
          <span>&#8377; 0</span>
          <span>&#8377; {priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
