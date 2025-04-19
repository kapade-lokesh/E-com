import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="mb-6 ">
        <Link to="/admin" className="text-2xl text-gray-200 font-medium">
          E-Com
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Sidebar</h2>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/admin/users"
          className={`${(isActive) =>
            isActive
              ? "bg-gray-700 text-white  rounded"
              : "text-gray-300 hover:bg-gray-700 hover:text-white "} flex items-center space-x-2 py-3 px-4 rounded`}
        >
          <FaUser />
          <span className="ml-2">Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={`${(isActive) =>
            isActive
              ? "bg-gray-700 text-white  rounded"
              : "text-gray-300 hover:bg-gray-700 hover:text-white "} flex items-center space-x-2 py-3 px-4 rounded`}
        >
          <FaBoxOpen />
          <span className="ml-2">Products</span>
        </NavLink>

        <NavLink
          to="admin/orders"
          className={`${(isActive) =>
            isActive
              ? "bg-gray-700 text-white  rounded"
              : "text-gray-300 hover:bg-gray-700 hover:text-white "} flex items-center space-x-2 py-3 px-4 rounded`}
        >
          <FaClipboardList />
          <span className="ml-2">Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className={`${(isActive) =>
            isActive
              ? "bg-gray-700 text-white  rounded"
              : "text-gray-300 hover:bg-gray-700 hover:text-white "} flex items-center space-x-2 py-3 px-4 rounded`}
        >
          <FaStore />
          <span className="ml-2">shop</span>
        </NavLink>
      </nav>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 flex items-center justify-center text-white w-full py-2 px-4 rounded hover:bg-red-700 transition duration-200 space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
