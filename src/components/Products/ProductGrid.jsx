import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ filterproducts, loading, error }) => {
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!filterproducts || filterproducts.length === 0) {
    return <p className="text-center">No products found</p>;
  }
  return (
    <>
      {/* {JSON.stringify(filterproducts)} */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {filterproducts.map((prod, index) => {
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

      {/* <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {console.log("filterproducts", props.filterproducts)}
        {props.filterproducts.map((prod) => {
          const image = prod.images?.[0]; // Safe access to image

          return (
            <Link to={`/product/${prod._id}`} className="block" key={prod._id}>
              <div className="bg-white rounded-lg">
                <div className="w-full h-96 mb-4">
                  {image ? (
                    <img
                      className="w-full h-full object-cover rounded"
                      src={image.url}
                      alt={image.alt || "product"}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <p>No image</p>
                    </div>
                  )}
                </div>
                <h3 className="text-sm mb-2">{prod.name}</h3>
                <p className="text-gray-500 tracking-tighter font-medium text-sm">
                  ₹{prod.price}
                </p>
              </div>
            </Link>
          );
        })}
      </div> */}
    </>
  );
};

export default ProductGrid;
