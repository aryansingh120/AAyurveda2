import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate=useNavigate();
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCheck(true), 500);
  }, []);

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

      {showCheck && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-md lg:max-w-lg z-10 flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-green-500 text-6xl mb-4"
          >
            <FaCheckCircle />
          </motion.div>
          <h2 className="text-2xl font-bold text-center text-orange-500">Login Success</h2>
          <p className="text-center text-gray-600 mb-6"> You are now logged in our website!</p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ff7043" }}
            className="w-full bg-orange-600 text-white py-2 rounded mt-4 hover:bg-orange-700 transition"
           onClick={()=>navigate("/")}>
            Go to Home
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default LoginSuccess;
