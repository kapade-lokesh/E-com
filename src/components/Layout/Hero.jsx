import React from "react";
import heroimg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <section>
        <img
          src={heroimg}
          alt="main-img"
          className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        />

        <div className="absolute top-[10px] sm:top-[400px] inset-0   flex justify-center items-center">
          <div className="p-6 text-center">
            <h1 className="uppercase text-center treking-tighter  text-4xl md:text-8xl text-white font-bold">
              vacation <br />
              ready
            </h1>

            <p className="text-sm text-center text-white tracking-tighter md:text-lg mb-6">
              Explore our vaction outfits with fast world wide shipping.
            </p>

            <Link className="text-lg rounded-sm px-6 py-2 text-gray-600 bg-white">
              shop now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
