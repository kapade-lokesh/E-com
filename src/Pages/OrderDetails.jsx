import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    const monckData = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "Phone pay",
      shippingMethod: "standred",
      shippingAddress: { city: "bhusawal", country: "India" },
      orderItems: [
        {
          productID: "1",
          name: "Jacket",
          price: 150,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },

        {
          productID: "2",
          name: "T-shirt",
          price: 150,
          quantity: 1,
          image: "https://picsum.photos/150?random=2",
        },

        {
          productID: "3",
          name: "Jeans",
          price: 150,
          quantity: 1,
          image: "https://picsum.photos/150?random=3",
        },
      ],
    };

    setOrderDetails(monckData);
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h2 className="text-3xl font-semibold">Order Details</h2>

        {!orderDetails ? (
          <p>No orderDetails Found</p>
        ) : (
          <div className="p-4 sm:p-6 rounded-lg border">
            <div className="flex flex-col sm:flex-row justify-between mb-8">
              <div>
                <h3>Oder Id : {orderDetails._id}</h3>
                <p>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col sm:items-end items-start mt-4 sm:mt-0">
                <span
                  className={`${
                    orderDetails.isPaid
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  } px-3 py-1 rounded-full text-sm font-medium mb-2`}
                >
                  {orderDetails.isPaid ? "Approved" : "Pending"}
                </span>

                <span
                  className={`${
                    orderDetails.isDelivered
                      ? "text-yellow-700 bg-yellow-100"
                      : "text-red-700 bg-red-100"
                  } px-3 py-1 rounded-full text-sm font-medium mb-2`}
                >
                  {orderDetails.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>
            </div>

            {/* customer payment and shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                <p>Payment Method: {orderDetails.paymentMethod}</p>
                <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"} </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">shipping Info</h4>
                <p>Shipping Method: {orderDetails?.shippingMethod}</p>
                <p>
                  Address : {orderDetails?.shippingAddress?.country} |{" "}
                  {orderDetails?.shippingAddress?.city}{" "}
                </p>
              </div>
            </div>

            {/* Product list */}

            <div className="overflow-x-auto">
              <h4 className="text-lg font-semibold mb-2">Products</h4>
              <table className="min-w-full text-gray-600 mb-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Unit Price</th>
                    <th className="py-2 px-4">Quqntity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {orderDetails.orderItems.map((product) => (
                    <tr key={product.productID} className="border-b">
                      <td className="py-2 px-4 flex items-center">
                        <img
                          src={product.image}
                          alt={product.image}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />

                        <Link
                          to={`/product/${product.productID}`}
                          className="text-blue-500 hover:underline"
                        >
                          {product.name}
                        </Link>
                      </td>

                      <td className="py-2 px-4 ">₹ {product.price}</td>

                      <td className="py-2 px-4">₹ {product.quantity}</td>

                      <td className="py-2 px-4 ">
                        ₹ {product.price * product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to={"/my-orders"} className="text-blue-500 hover:underline">
              Back to Orders
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
