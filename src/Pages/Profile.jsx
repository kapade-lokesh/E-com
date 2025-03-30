import React from "react";
import MyOrders from "./MyOrders";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto  flex-grow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left section */}
          <div className="w-full md:w-1/3  lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Lokesh kapade
            </h1>
            <p className="text-sm text-gray-600 mb-4 tracking-tighter">
              lokeshkapade143@gmail.com
            </p>
            <button className="w-full bg-red-400 rounded py-2 px-2 text-white hover:bg-red-300">
              Logout
            </button>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
