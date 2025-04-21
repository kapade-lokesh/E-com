import React from "react";

const OrderManagement = () => {
  const orders = [
    {
      _id: 12341,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
  ];

  const handleStatusChange = (orderId, updatedStatus) => {
    console.log("Order ID:", orderId, "Updated Status:", updatedStatus);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-3 py-4">order Id</th>
              <th className="px-3 py-4">customer</th>
              <th className="px-3 py-4">total</th>
              <th className="px-3 py-4">status</th>
              <th className="px-3 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 ">
                  <td className="p-3 font-normal text-gray-900 whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="p-3">{order.user.name}</td>
                  <td className="p-3">{order.totalPrice}</td>
                  <td className="p-3">
                    <select
                      name="status"
                      id="status"
                      className="outline-none ring-1 ring-indigo-500 border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:ring-2"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="processing">processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <button
                      onChange={(e) =>
                        handleStatusChange(order._id, "Delivered")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b">
                <td colSpan={4} className="px-3 py-4 text-center">
                  No orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
