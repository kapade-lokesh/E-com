import React from "react";
import Hero from "../components/Layout/Hero";
import Gendercollection from "../components/Products/Gendercollection";
import NewArrivals from "../components/Products/NewArrivals";

const Home = () => {
  return (
    <section>
      {/* hero */}
      <Hero />

      {/* gender collection cards */}
      <Gendercollection />

      {/* newArrivals */}
      <NewArrivals />
    </section>
  );
};

export default Home;
