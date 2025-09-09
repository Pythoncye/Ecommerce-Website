import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    is_staff: false, // default to false
  });

  const navigate = useNavigate()

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const access = localStorage.getItem("access")

  console.log(typeof access)
  console.log("test",access)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
        `http://localhost:8000/api/adminregister/`,
        form,
        {
            headers: {
                Authorization: `Bearer ${access}`,
                "Content-Type": "application/json",
                },
            }
        );
      setMessage("Registration Successful");
      navigate('/login')
    } catch (error) {
      setMessage(
        "Registration Failed: " +
          (error.response?.data?.username || error.message)
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Create Account with REDMART for Admin Access
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Is Staff (Admin/User toggle) */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_staff"
              checked={form.is_staff}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Register as Staff (Admin)
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

          {/* Feedback message */}
          {message && (
            <p
              className={`text-center mt-3 font-semibold ${
                message.includes("Successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterForm;
