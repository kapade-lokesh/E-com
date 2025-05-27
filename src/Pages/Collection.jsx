import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import {
  FilterSidebar,
  Sortoptions,
  ProductGrid,
} from "../components/Products";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/Slices/productSlice";

const Collection = () => {
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const queryParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  console.log("searchParams:", searchParams.toString());
  console.log("queryParams:", queryParams);

  const toggleSideBar = () => {
    setSideBarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const params = {
      collection,
      ...queryParams,
    };
    dispatch(fetchProductsByFilter(params));
  }, [dispatch, collection, searchParams.toString()]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        console.log("mouse Event called..");
        setSideBarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform lg:static lg:translate-x-0 duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl mb-4">All Collection</h2>

        {/* Sort options */}
        <Sortoptions />

        <ProductGrid
          filterproducts={products}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Collection;
