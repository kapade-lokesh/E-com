import React, { useState } from "react";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight, HiMiniXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { CartDrawer } from "../Layout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mobileDrawer, setMobileDrawer] = useState(false);

  const toggelCartDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawer(!mobileDrawer);
  };

  return (
    <>
      <div className="container mx-auto  px-3 py-3 flex  justify-between items-center">
        {/* Logo */}
        <div className="text-xl text-black">
          <span className="text-indigo-500 text-2xl">E</span>-
          <span className="text-2xl">com</span>
        </div>

        {/* Menus */}
        <div className="space-x-5 hidden md:flex lg:flex ">
          <Link
            to="/collections/all?gender=Men"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase"
          >
            Mens
          </Link>

          <Link
            to="/collections/all?gender=Women"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase"
          >
            womens
          </Link>

          <Link
            to="/collections/all?category=Top Wear"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase"
          >
            Top Wear
          </Link>

          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-sm text-gray-700  hover:text-black font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/* nav-icons */}

        <div className="flex items-center space-x-3">
          <Link
            to="/admin"
            className="text-white px-3 text-center py-0.5 rounded w-24 bg-black"
          >
            Admin
          </Link>

          <Link to="/profile" className="text-gray-700  hover:text-black">
            <HiOutlineUser className="h-5 w-5" />
          </Link>

          <button className="relative" onClick={toggelCartDrawer}>
            <HiOutlineShoppingBag className="h-5 w-5 text-gray-600 hover:text-black" />
            <span className="absolute -top-2.5 text-xs w-4 h-4 bg-red-500 rounded-full text-white">
              4
            </span>
          </button>

          {/* search */}
          <Searchbar />

          <button onClick={toggleMobileDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-5 w-5 text-gray-700  hover:text-black" />
          </button>
        </div>

        {/* cart drawer  */}
        <CartDrawer isOpen={isOpen} toggelCartDrawer={toggelCartDrawer} />

        {/* mobile navigation */}
        <div
          className={`fixed z-50 top-0 left-0 w-2/4 sm:w-1/2 md:w-1/3 h-full bg-white flex flex-col transition transiton-transform duration-300 shadow-lg ${
            mobileDrawer ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end">
            <button onClick={toggleMobileDrawer}>
              <HiMiniXMark className="h-5 w-5 text-gray-500 hover:text-black" />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <nav className="space-y-4">
              <Link
                to="/collections/all?gender=Men"
                onClick={toggleMobileDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Men
              </Link>

              <Link
                to="/collections/all?gender=Women"
                onClick={toggleMobileDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Women
              </Link>

              <Link
                to="/collections/all?category=Top Wear"
                onClick={toggleMobileDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Top wear
              </Link>

              <Link
                to="/collections/all?category=Bottom Wear"
                onClick={toggleMobileDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Bottom Wear
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
