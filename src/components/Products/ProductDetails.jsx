import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProducts = {
  name: "stylish jacket",
  price: 120,
  originalPrice: 150,
  description: "This is the stylish jacket perfect for any occation",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "L", "M", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      alt: "jacket-1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      alt: "jacket-2",
    },
  ],
};

const similarProducts = [
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
];

const ProductDetails = () => {
  const [imgurl, setImgurl] = useState("");
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setButttonDisable] = useState(false);

  useEffect(() => {
    if (imgurl == "") {
      setImgurl(selectedProducts.images[0].url);
    }
  }, [imgurl]);

  const handleQuantityChange = (change) => {
    if (change == "-") {
      if (quantity == 1) {
        return setQuantity(1);
      }
      setQuantity((prev) => prev - 1);
      console.log(quantity);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddtoCart = () => {
    if (!selectedColor || !selectedSize) {
      return toast.error("Please select the color and size", {
        duration: 1000,
      });
    }
    setButttonDisable(true);

    setTimeout(() => {
      toast.success("Added to cart", { duration: 1000 });
      setButttonDisable(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="mx-w-6xl mx-auto bg-white rounded-lg p-8">
        <div className="flex flex-col md:flex-row">
          {/* Left thunbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProducts.images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alt}
                  onClick={() => setImgurl(image.url)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                />
              );
            })}
          </div>

          {/* Main image  */}
          <div className="md:1/2">
            <div className="mb-4">
              <img
                src={imgurl}
                alt="main-product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile thumbnail  */}
          <div className="md:hidden flex overscroll-x-scroll space-x-2 mb-4">
            {selectedProducts.images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alt}
                  onClick={() => setImgurl(image.url)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                />
              );
            })}
          </div>

          {/* right content */}
          <div className="md:1/2 md:ml-10">
            <h1 className="text-2xl font-smeibold md:text-3xl mb-2">
              {selectedProducts.name}
            </h1>

            <p className="text-lg text-gray-600 mb-1 line-through">
              &#8377; {selectedProducts.originalPrice}
            </p>

            <p className="text-xl text-gray-500 mb-2 ">
              &#8377; {selectedProducts.price}
            </p>

            <p className="text-gray-600 mb-4">{selectedProducts.description}</p>

            <div className="mb-4">
              <p className="text-gray-700"> Color:</p>
              <div className="flex gap-2 mb-2">
                {selectedProducts.colors.map((color, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      className={`w-8 h-8 rounded-full border ${
                        color === selectedColor ? "border-4 border-white" : ""
                      }`}
                    ></button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Sizes:</p>
              <div className="flex gap-2 mb-2">
                {selectedProducts.sizes.map((size, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                      className={`w-8 h-8 rounded-lg border ${
                        size === selectedSize ? "bg-gray-400 border-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex gap-2 mb-2 mt-2">
                <button
                  onClick={() => handleQuantityChange("-")}
                  className="border h-7 rounded bg-gray-200 px-2"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("+")}
                  className="border h-7 rounded bg-gray-200 px-1"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  handleAddtoCart();
                }}
                disabled={isButtonDisable}
                className={`bg-black w-full rounded-md text-center text-white py-1 ${
                  isButtonDisable ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isButtonDisable ? "Adding.." : "Add to cart"}
              </button>
            </div>

            <div className="mt-6 text-gray-700">
              <h3 className="text-xl font-bold mb-4">characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-700">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProducts.brand}</td>
                  </tr>

                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProducts.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
