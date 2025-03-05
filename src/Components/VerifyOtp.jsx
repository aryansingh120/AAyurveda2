import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("OTP must be 6 digits long");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("https://aayurveda-hn8w.onrender.com/user/verifyOtp", {
        otp: otp,
      });

      if (response.status === 200) {
        setSuccessMessage("OTP verified successfully!");
          navigate("/successfull"); 
        
      } else {
        setError("OTP verification failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const animatedBackgrounds = [
    { className: "top-10 left-10 w-32 h-32 bg-orange-300", animate: { x: [0, 20, 0], y: [0, -20, 0] } },
    { className: "bottom-10 right-10 w-40 h-40 bg-orange-600", animate: { x: [0, -20, 0], y: [0, 20, 0] } },
    { className: "top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-400 to-red-600 transform -translate-x-1/2 -translate-y-1/2", animate: { rotate: [0, 360] } },
    { className: "bottom-0 left-1/4 w-48 h-48 bg-yellow-500", animate: { y: [0, -50, 0] } },
    { className: "top-1/4 right-1/4 w-24 h-24 bg-red-400", animate: { y: [0, -30, 0] } },
    { className: "bottom-1/2 right-1/2 w-32 h-32 bg-orange-400", animate: { x: [0, 10, 0], y: [0, 10, 0] } },
    { className: "top-1/3 left-1/3 w-28 h-28 bg-yellow-400", animate: { x: [0, -10, 0], y: [0, -10, 0] } },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
      {animatedBackgrounds.map((bg, index) => (
        <motion.div
          key={index}
          animate={bg.animate}
          transition={{ repeat: Infinity, duration: 3 + index, ease: "easeInOut" }}
          className={`absolute rounded-full opacity-20 ${bg.className}`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-md lg:max-w-lg z-10"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-6">Enter the OTP sent to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">OTP</label>
            <motion.input
              whileFocus={{ scale: 1.05, borderColor: "#ff5722" }}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              inputMode="numeric" 
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ff7043" }}
            className="w-full bg-orange-600 text-white py-2 rounded mt-4 hover:bg-orange-700 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Verify OTP"}
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Didn't receive OTP? <a href="#" className="text-orange-500">Resend OTP</a>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;