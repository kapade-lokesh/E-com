import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
  FilterSidebar,
  Sortoptions,
  ProductGrid,
} from "../components/Products";

const Collection = () => {
  const [products, setproducts] = useState([]);
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggelSideBar = (e) => {
    setSideBarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      console.log("mouse Event called..");
      setSideBarOpen(false);
    }
  };
  useEffect(() => {
    //Add Event listner
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = [
      {
        _id: 1,
        name: "Product 1",
        price: 120,
        images: [
          { url: "https://picsum.photos/500/500?random=2", alt: "jacket-2" },
        ],
      },
      {
        _id: 2,
        name: "Product 2",
        price: 150,
        images: [
          { url: "https://picsum.photos/500/500?random=3", alt: "jacket-3" },
        ],
      },
      {
        _id: 3,
        name: "Product 3",
        price: 180,
        images: [
          { url: "https://picsum.photos/500/500?random=4", alt: "jacket-4" },
        ],
      },
      {
        _id: 4,
        name: "Product 4",
        price: 200,
        images: [
          { url: "https://picsum.photos/500/500?random=5", alt: "jacket-5" },
        ],
      },
      {
        _id: 5,
        name: "Product 5",
        price: 250,
        images: [
          { url: "https://picsum.photos/500/500?random=6", alt: "jacket-6" },
        ],
      },
      {
        _id: 6,
        name: "Product 6",
        price: 300,
        images: [
          { url: "https://picsum.photos/500/500?random=7", alt: "jacket-7" },
        ],
      },
      {
        _id: 7,
        name: "Product 7",
        price: 350,
        images: [
          { url: "https://picsum.photos/500/500?random=8", alt: "jacket-8" },
        ],
      },
      {
        _id: 8,
        name: "Product 8",
        price: 400,
        images: [
          { url: "https://picsum.photos/500/500?random=9", alt: "jacket-9" },
        ],
      },
    ];
    setTimeout(() => {
      setproducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggelSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={` fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform lg:static lg:translate-x-0 duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4 ">
        <h2 className="text-2xl mb-4">All Collection</h2>

        {/* Sort options */}
        <Sortoptions />

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Collection;
