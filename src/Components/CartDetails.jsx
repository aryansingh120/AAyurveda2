import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartDetails = () => {
    const {product,fetchCartItems,removeItem,handleOrderNow}=useCart();
    const [products,setProducts]=useState([])
    const location=useLocation();
    useEffect(() => {
      if (location.pathname === "/cartDetails") {
        fetchCartItems(); 
      }
    }, [location.pathname]);

    useEffect(() => {
      if (product?.allCarts) {
        setProducts(product.allCarts);
      }
    }, [product]);

    const updateQuantity = (productId, newQuantity) => {
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
      );
    };


  return (
    <div className="w-11/12 md:w-4/5 mx-auto space-y-6 mb-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center">🛒 Your Shopping Cart</h1>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border border-gray-300 p-6 shadow-lg bg-white rounded-lg transition-all duration-300 hover:shadow-xl"
          >
            {/* Left: Product Image */}
            <img
              className="w-full md:w-40 md:h-44 object-cover rounded-md"
              src={product?.productId?.url || "fallback-image.png"}
              alt={product?.productId?.productName || "Product"}
            />

            {/* Right: Product Details */}
            <div className="mt-4 md:mt-0 md:ml-6 flex-1 space-y-2">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {product?.productId?.description || "N/A"}
              </h2>

              {/* Static Seller Field */}
              <p className="text-gray-500 text-sm">
                Seller: <span className="text-blue-600 font-medium">Best Seller</span>
              </p>

              {/* Quantity Field */}
              <div className="flex items-center space-x-4">
                <p className="text-gray-500 text-sm">Quantity:</p>
                <button
                onClick={() => updateQuantity(product.productId._id, product.quantity - 1)}
                  className="bg-gray-300 px-3 py-1 rounded-md"
                >
                  -
                </button>
                <span className="text-orange-500 font-semibold">{product.quantity}</span>
                <button
                 onClick={() => updateQuantity(product.productId._id, product.quantity + 1)}
                  className="bg-gray-300 px-3 py-1 rounded-md"
                >
                  +
                </button>
              </div>

              {/* Subtotal Calculation */}
              <p className="text-gray-600 font-medium text-md">
                Subtotal: ₹{(product.quantity * product?.productId?.discountedPrice).toFixed(2)}
              </p>

              {/* Delivery */}
              <p className="text-green-600 text-sm font-medium">🚚 Delivery in 2 days</p>

              {/* Price & Discount */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 line-through text-sm">₹{product?.productId?.price || 0}</span>
                <span className="text-xl font-bold text-orange-500">₹{product?.productId?.discountedPrice || 0}</span>
                <span className="text-green-600 font-semibold text-sm">
                  {product?.productId?.discount || "0%"} Off
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-wrap justify-center md:justify-end space-x-4">
                <button
                  onClick={() => handleOrderNow(product)}
                  className="bg-orange-500 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                  🛍 Order Now
                </button>
                <button
                  onClick={() => removeItem(product.productId._id)}
                  className="bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                 >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-lg font-medium mt-8">
          Your cart is empty! 🛒
        </p>
      )}
    </div>
  );
};

export default CartDetails;
