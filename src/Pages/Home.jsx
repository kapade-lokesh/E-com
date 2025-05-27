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

const sampleProducts = [
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

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    console.log("Fetching products by filter");
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

        setBestSellers(response.data.product);
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
