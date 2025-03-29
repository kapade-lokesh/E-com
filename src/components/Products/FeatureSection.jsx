import React from "react";
import { HiShoppingBag } from "react-icons/hi";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Featured first */}
        <div className="flex flex-col items-center">
          <div className="p-4 runded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>

          <h4 className="tracking-tighter">FREE INTERNATIONAL SHIPPING</h4>

          <p className="text-gray-600 text-sm tracking-tighter">
            on all orders over &#8377; 500
          </p>
        </div>

        {/* Featured first */}
        <div className="flex flex-col items-center">
          <div className="p-4 runded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>

          <h4 className="tracking-tighter">45 DAYS RETURN</h4>

          <p className="text-gray-600 text-sm tracking-tighter">
            money back guarantee
          </p>
        </div>

        {/* Featured first */}
        <div className="flex flex-col items-center">
          <div className="p-4 runded-full mb-4">
            <HiShoppingBag className="text-xl" />
          </div>

          <h4 className="tracking-tighter">SECURE CHEKOUT</h4>

          <p className="text-gray-600 text-sm tracking-tighter">
            100% secure checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
