import React, { useState } from "react";
//import './RegisterForm.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [message,setMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try{
        await axios.post("http://localhost:8000/api/register/", form);
        setMessage('Registration Successful')
        navigate('/login')
    }
    catch(error){
        setMessage('Registration Failed',+(error.response?.data?.username || error.message))
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
    <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">Create Account</h2>
    <p className="text-center text-gray-500 mb-4">Create Account with REDMART for your shoping</p>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
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
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
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
        <p className={`text-center mt-3 font-semibold ${message.includes("Successful") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  </div>
</div>
  );
};

export default RegisterForm;
