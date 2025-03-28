import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((prod, index) => {
          return (
            <Link to={`/product/${prod._id}`} className="block" key={prod._id}>
              <div className="bg-white rounded-lg">
                <div className="w-full h-96 mb-4">
                  <img
                    className="w-full h-full object-cover rounded"
                    src={prod.images[0].url}
                    alt={prod.images[0].alt}
                  />
                </div>
                <h3 className="text-sm  mb-2">{prod.name}</h3>

                <p className="text-gray-500 tracking-tighter font-medium text-sm">
                  &#8377;{prod.price}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProductGrid;
