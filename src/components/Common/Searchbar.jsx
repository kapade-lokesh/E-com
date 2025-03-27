import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { SiEthers } from "react-icons/si";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    console.log(searchTerm);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full h-18 bg-white border-red-500 z-50"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <div className="relative flex justify-center items-center w-full ">
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="bg-gray-100 rounded-lg px-4 py-2 pl-2 pr-12 palacehoder:text-gray-700 focus:outline-none w-full"
            />

            {/* searchbar */}
            <button
              onClick={(e) => handleSearch(e)}
              className="absolute top-3 transfrom -translate-x-10"
            >
              <HiMagnifyingGlass className="h-5 w-5 text-gray-700  hover:text-black" />
            </button>

            <button
              onClick={handleSearchToggle}
              className="absolute top-3 transfrom translate-x-30"
            >
              <HiMiniXMark className="h-7 w-7 text-gray-700  hover:text-black" />
            </button>
          </div>
        </div>
      ) : (
        <button className="" onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-5 w-5 text-gray-700 hover:text-black" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
