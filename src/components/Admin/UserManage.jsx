import React, { useState } from "react";

const UserManage = () => {
  const users = [
    {
      _id: "123",
      name: "John Doe",
      email: "example123@gmail.com",
      role: "admin",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //default role
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer", //default role
    });
  };

  const handleRoleChange = (userId, updatedUserRole) => {
    console.log(userId, updatedUserRole);
  };

  const handleDeleteUser = (userId) => () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("deleting user with id", userId);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {/* new user from*/}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handelChange(e)}
              className="w-full p-2 border border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-400 transition-all duration-100 rounded"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handelChange(e)}
              className="w-full p-2 border border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-400 transition-all duration-100 rounded"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handelChange(e)}
              className="w-full p-2 border border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-400 transition-all duration-100 rounded"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block">Role</label>
            <select
              name="role"
              id="userRoel"
              onChange={(e) => handelChange(e)}
              className="w-full p-2 border border-indigo-400 focus:outline-none  focus:ring focus:ring-indigo-400 transition-all duration-100 rounded"
            >
              <option value="customer" className="focus:outline-none">
                Customer
              </option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
          >
            Add User
          </button>
        </form>
      </div>

      {/* user list */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-3 py-4">Name</th>
              <th className="px-3 py-4">Email</th>
              <th className="px-3 py-4">Role</th>
              <th className="px-3 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 ">
                  <td className="p-3 font-normal text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <select
                      name="role"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={handleDeleteUser(user._id)}
                      className="text-white px-4 py-2 rounded bg-red-500  hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b">
                <td colSpan={4} className="px-3 py-4 text-center">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
