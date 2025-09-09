import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({onLogin}) => {
    const [form, setForm] = useState({
        username: "",
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
        
        const response = await axios.post('http://localhost:8000/api/login/',form);
        setMessage('Login Successful')
        if (onLogin){
            onLogin(response.data.refresh,response.data.access,response.data.user_id,response.data.superuser)
        }
        navigate('/')

    }
    catch(error){
        setMessage('Login Failed')
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
    <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">Welcome Back</h2>
    <p className="text-center text-gray-500 mb-4">Login to continue your Shoping</p>
    
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="mt-1 w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Login
      </button>

      <Link to='/register'><button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Create Account
      </button></Link>

      {message && <p className="text-center mt-3 font-semibold text-red-500">{message}</p>}
    </form>
  </div>
</div>
  )
}

export default LoginForm
