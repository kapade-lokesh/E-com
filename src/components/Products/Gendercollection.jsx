import React from "react";
import mensimg from "../../assets/mens-collection.webp";
import womenimg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";
const Gendercollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* womens collection */}
        <div className="relative flex-1">
          <img
            src={womenimg}
            alt="wones-collectoin"
            className="w-full h-[700px] object-cover"
          />

          <div className="absolute bottom-8 left-8 bg-white opacity-90 p-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Womne's Collection
            </h3>

            <Link
              to="/collection/all?gender=women"
              className="text-gray-900 underline"
            >
              shop now
            </Link>
          </div>
        </div>

        {/* mens collecction */}

        <div className="relative flex-1">
          <img
            src={mensimg}
            alt="wones-collectoin"
            className="w-full h-[700px] object-cover"
          />

          <div className="absolute bottom-8 left-8 bg-white opacity-90 p-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Men's Collection
            </h3>

            <Link
              to="/collection/all?gender=women"
              className="text-gray-900 underline"
            >
              shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gendercollection;
