import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const handelrowClick = (id) => () => {
    // navigate to order details page
    navigate(`/order/${id}`);
  };
  useEffect(() => {
    setTimeout(() => {
      //simulate the fetch orders
      const mockOrders = [
        {
          _id: "123",
          createdAt: new Date(),
          shippingAddress: { city: "bhusawal", country: "india" },
          orderItems: [
            {
              name: "product-1",
              image: "https://picsum.photos/500/500?random=10",
            },
          ],
          totalPrice: 200,
          isPaid: true,
        },

        {
          _id: "1234",
          createdAt: new Date(),
          shippingAddress: { city: "faizpur", country: "india" },
          orderItems: [
            {
              name: "product-1",
              image: "https://picsum.photos/500/500?random=10",
            },
          ],
          totalPrice: 200,
          isPaid: true,
        },

        {
          _id: "1235",
          createdAt: new Date(),
          shippingAddress: { city: "pune", country: "india" },
          orderItems: [
            {
              name: "product-1",
              image: "https://picsum.photos/500/500?random=10",
            },
          ],
          totalPrice: 200,
          isPaid: true,
        },

        {
          _id: "1236",
          createdAt: new Date(),
          shippingAddress: { city: "mumbai", country: "india" },
          orderItems: [
            {
              name: "product-1",
              image: "https://picsum.photos/500/500?random=10",
            },
          ],
          totalPrice: 200,
          isPaid: true,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-2 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <tr
                    key={order._id}
                    className="border-b hover:border-gray-50 cursor-pointer"
                    onClick={handelrowClick(order._id)}
                  >
                    <td className="">
                      <img
                        src={order?.orderItems[0]?.image}
                        alt={order.name}
                        className="w-24 h-24   objject-cover rounded-lg"
                      />
                    </td>

                    <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {order._id}
                    </td>

                    <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>

                    <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.shippingAddress
                        ? `${order.shippingAddress.city} ${order.shippingAddress.country}`
                        : "N/A"}
                    </td>

                    <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.orderItems.length}
                    </td>

                    <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.totalPrice}
                    </td>

                    <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      <span
                        className={`${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } px-2 py-1 rounded-full font-medium text-xs sm:text-sm`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  you have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
