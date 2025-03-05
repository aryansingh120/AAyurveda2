import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let errors = { email: "", password: "" };

    if (!validateEmail(email)) {
      errors.email = "Invalid email address";
      valid = false;
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(errors);
    if (valid) {
      setLoading(true);
      setApiError(""); 
      try {
        const response = await axios.post("https://aayurveda-hn8w.onrender.com/user/login", { email, password });
      
        if (response.status === 200) {
          const { token, userName } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('username', userName);
          console.log("Login successful");
          navigate("/loginSuccess");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
        setApiError(errorMessage); 
        console.error("Login error", errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-30"
      ></motion.div>
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-orange-600 rounded-full opacity-30"
      ></motion.div>
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-400 to-red-600 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
      <motion.div
        animate={{ y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-48 h-48 bg-yellow-500 rounded-full opacity-20"
      ></motion.div>
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-24 h-24 bg-red-400 rounded-full opacity-20"
      ></motion.div>
      <motion.div
        animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute bottom-1/2 right-1/2 w-32 h-32 bg-orange-400 rounded-full opacity-20"
      ></motion.div>
      <motion.div
        animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-28 h-28 bg-yellow-400 rounded-full opacity-20"
      ></motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-md lg:max-w-lg z-10"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Login to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <motion.input 
              whileFocus={{ scale: 1.05, borderColor: "#ff5722" }}
              type="email" 
              className="w-full p-2 border rounded" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <motion.input 
              whileFocus={{ scale: 1.05, borderColor: "#ff5722" }}
              type="password" 
              className="w-full p-2 border rounded" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {apiError && (
            <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
          )}

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#ff7043" }}
            className="w-full bg-orange-600 text-white py-2 rounded mt-4 hover:bg-orange-700 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          <span  className="text-orange-500 cursor-pointer" onClick={() => navigate("/forgotPassword")}>Forgot Password?</span>
        </p>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <span  className="text-orange-500 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;