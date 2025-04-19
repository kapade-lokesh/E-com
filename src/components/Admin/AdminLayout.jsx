import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row  relative">
      {/* sidebar */}
      <div className="bg-gray-900 flex  text-white z-20 md:hidden">
        <button>
          <FaBars className="h-5 w-5 text-white" onClick={toggleSidebar} />
        </button>

        <h4 className="ml-4 text-xl font-medium">Admin DashBoard</h4>
      </div>

      {/* overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* sidebar */}
      <div
        className={`bg-gray-900 text-white w-64 min-h-screen md:relative absolute  z-20 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:bolck z-20`}
      >
        {/* adminsideBar component */}
        <AdminSidebar />
      </div>

      {/* main content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
