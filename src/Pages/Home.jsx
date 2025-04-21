import React from "react";
import { Hero } from "../components/Layout";
import {
  ProductDetails,
  ProductGrid,
  Gendercollection,
  FeatureSection,
  NewArrivals,
  FeaturedCollection,
} from "../components/Products";
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
      <ProductDetails />

      <div className="container mx-auto">
        <h3 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women's
        </h3>
        <ProductGrid products={sampleProducts} />
      </div>

      <FeaturedCollection />

      <FeatureSection />
    </section>
  );
};

export default Home;
