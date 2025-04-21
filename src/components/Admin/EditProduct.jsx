import React from "react";
import { useParams } from "react-router-dom";
const EditProduct = () => {
  const { id } = useParams();
  console.log(id);

  const [productData, setProductData] = React.useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    countInStock: 0,
    sku: "",
    brand: "",
    sizes: [],
    colors: [],
    collection: "",
    material: "",
    gender: "",
    image: [
      {
        url: "https://picsum.photos/500/500?random=10",
        alt: "product-1",
      },
      {
        url: "https://picsum.photos/500/500?random=10",
        alt: "product-1",
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  const handleChanege = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md ">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChanege}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Product Description"
            value={productData.description}
            onChange={handleChanege}
            required
            rows={4}
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Product Name"
            value={productData.price}
            onChange={handleChanege}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Count in Stock
          </label>
          <input
            type="text"
            name="countInStock"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Product Name"
            value={productData.countInStock}
            onChange={handleChanege}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="SKU"
            value={productData.sku}
            onChange={handleChanege}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Sizes
          </label>
          <input
            type="text"
            name="sizes"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Sizes"
            value={productData.sizes.join(",")}
            onChange={(e) => {
              const sizes = e.target.value
                .split(",")
                .map((size) => size.trim());
              setProductData((prev) => ({ ...prev, sizes }));
            }}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Colors
          </label>
          <input
            type="text"
            name="sizes"
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Colors"
            value={productData.colors.join(",")}
            onChange={(e) => {
              const colors = e.target.value
                .split(",")
                .map((color) => color.trim());
              setProductData((prev) => ({ ...prev, colors }));
            }}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Upload image
          </label>
          <input type="file" className="" onChange={handleImageUpload} />

          <div className="flex gap-4 mt-4">
            {productData.image.map((img, index) => (
              <div key={index}>
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className=" w-full bg-green-600 hover:bg-green-700 text-white  py-2 rounded-md transition-colors"
        >
          Upadate Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
