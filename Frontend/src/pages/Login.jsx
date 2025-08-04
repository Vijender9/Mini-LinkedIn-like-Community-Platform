import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import API from '../api/axios.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const[form,setForm]=useState({
        email:"",
        password:"",
    })
    const [error,setError]=useState("");
    const { user,setUser}=useAuth();
    const navigate = useNavigate();

   const handleChange=(e)=>{
       setForm({ ...form, [e.target.name]: e.target.value });
   }

   const handleSubmit= async(e)=>{
        e.preventDefault();
    setError("");
    try {
      console.log("im in login page")
      const res = await API.post("/user/login", form);
      console.log("res after login:",res);
      const { token, safeUser } = res.data.data;

      // setUser(res.data.data.safeUser);

      localStorage.setItem("token", token);
     
      setUser(safeUser);
       
      navigate("/");
      console.log("user in login after setting",user)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
   }

  return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back 👋</h2>
          <p className="text-gray-500 text-center mt-2">Login to your account</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-black py-2 rounded-md transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login