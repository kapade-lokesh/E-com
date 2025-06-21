import React, { useEffect, useState } from "react";
import { Hero } from "../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  ProductDetails,
  ProductGrid,
  Gendercollection,
  FeatureSection,
  NewArrivals,
  FeaturedCollection,
} from "../components/Products";

import { useDispatch } from "react-redux";
import { fetchProductsByFilter } from "../redux/Slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    dispatch(
      fetchProductsByFilter({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSellers = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_BACKEND_URL}products/getbestseller`
        );
        setBestSellers(response.data.data?.product);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
  }, [dispatch]);

  return (
    <section>
      {/* hero */}
      <Hero />

      {/* gender collection cards */}
      <Gendercollection />

      {/* newArrivals */}
      <NewArrivals />

      {/* Best seller section */}
      <h2 className="text-3xl font-bold mb-4 text-center pt-10">Best seller</h2>
      {bestSellers ? (
        <ProductDetails productId={bestSellers ? bestSellers._id : ""} />
      ) : (
        <p className="text-center"> "Loading Best Seller"</p>
      )}

      <div className="container mx-auto">
        <h3 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women's
        </h3>
        {products && products.length > 0 ? (
          <ProductGrid
            filterproducts={products}
            loading={loading}
            error={error}
          />
        ) : (
          <p className="text-center text-4xl text-red-500"> "Loading"</p>
        )}
      </div>

      <FeaturedCollection />

      <FeatureSection />
    </section>
  );
};

export default Home;
