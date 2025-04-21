import React from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const products = [
    {
      _id: "123",
      name: "product-1",
      image: "https://picsum.photos/500/500?random=10",
      price: 200,
      sku: "123456",
    },
  ];

  const handleDeleteproduct = (productId) => () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("deleting user with id", productId);
    }
  };

    

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-3 py-4">Name</th>
              <th className="px-3 py-4">Price</th>
              <th className="px-3 py-4">SKU</th>
              <th className="px-3 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 ">
                  <td className="p-3 font-normal text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="text-white mr-2 px-2 py-1 rounded bg-yellow-500  hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={handleDeleteproduct(product._id)}
                      className="text-white px-2 py-1 rounded bg-red-500  hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b">
                <td colSpan={4} className="px-3 py-4 text-center">
                  No products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
