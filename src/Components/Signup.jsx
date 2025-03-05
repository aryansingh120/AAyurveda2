import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [apiError, setApiError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let errors = { fullName: "", email: "", password: "", confirmPassword: "" };

        if (fullName.trim() === "") {
            errors.fullName = "Full Name is required";
            valid = false;
        }

        if (!validateEmail(email)) {
            errors.email = "Invalid email address";
            valid = false;
        }

        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
            valid = false;
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(errors);
        if (valid) {
            setIsProcessing(true);
            try {
                const response = await axios.post("http://localhost:2100/user/signup", {
                    fullName,
                    email,
                    password,
                    confirmPassword
                });
                if (response.status === 200) {
                    navigate("/verifyOtp");
                } else {
                    setApiError(response.data.message || "Signup failed. Try again.");
                }
            } catch (error) {
                setApiError(error.response?.data?.message || "Signup failed. Try again.");
            }
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
            {/* Background Animation */}
            <motion.div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-30" animate={{ x: [0, 20, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}></motion.div>
            <motion.div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-600 rounded-full opacity-30" animate={{ x: [0, -20, 0], y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}></motion.div>
            
            {/* Signup Card */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs md:max-w-md lg:max-w-lg z-10">
                <h2 className="text-2xl font-bold text-center text-orange-500">Create Account</h2>
                <p className="text-center text-gray-600 mb-6">Sign up to get started</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" className="w-full p-2 border rounded" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" className="w-full p-2 border rounded" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <button className="w-full bg-orange-600 text-white py-2 rounded mt-4 hover:bg-orange-700 transition" type="submit" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Sign Up"}
                    </button>
                    {apiError && <p className="text-red-500 text-sm text-center mt-2">{apiError}</p>}
                </form>
                <p className="text-center text-gray-600 mt-4">Already have an account? <span className="text-orange-500 cursor-pointer" onClick={() => navigate("/login")} >Login</span></p>
            </motion.div>
        </div>
    );
};

export default SignupPage;
