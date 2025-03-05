import React, { useState, useRef } from "react";
import { FaPlus, FaMinus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFunction } from "./FunctionContext";
import img1 from "../assets/product.webp";
import img6 from "../assets/img1.webp";
import img2 from "../assets/img3.webp";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.webp";
import img5 from "../assets/img5.webp";

const QuickView = ({ product, onClose, addToCart }) => {
  const { increaseQuantity, decreaseQuantity, quantity } = useFunction();
  const [isAddingToCart, setIsAddingToCart] = useState(false); 

  if (!product) return null;

  console.log(product);
  const defaultImages = [product.url, img3, img4, img5, img6];
  const [selectedImage, setSelectedImage] = useState(defaultImages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null); 

  const handleNext = () => {
    if (currentIndex < defaultImages.length - 1) {
      const newIndex = currentIndex + 1;
      setSelectedImage(defaultImages[newIndex]);
      setCurrentIndex(newIndex);

      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 70, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setSelectedImage(defaultImages[newIndex]);
      setCurrentIndex(newIndex);

      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -70, behavior: "smooth" });
      }
    }
  };

  const handleAddToCart = async (e, productId, quantity) => {
    setIsAddingToCart(true); 
    try {
      await addToCart(e, productId, quantity); 
      console.log("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false); 
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        id="modal-overlay"
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-[70%] p-6 rounded-lg shadow-lg relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-2 right-2 text-xl text-gray-700" onClick={onClose}>
            <FaTimes />
          </button>

          <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
            -{product.discount}%
          </span>

          <div className="flex">
            <div className="w-1/2 p-4 flex flex-col items-center">
              <img src={selectedImage} alt="Product" className="w-full h-auto rounded-md" />

              {defaultImages.length > 1 && (
                <div className="relative w-full mt-4">
                  <button
                    className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2"
                    onClick={handlePrev}
                  >
                    <FaChevronLeft className="text-xl text-gray-600" />
                  </button>

                  <div ref={scrollRef} className="flex gap-2 overflow-x-scroll hide scrollbar-hide p-2 rounded-md w-full max-w-xs mx-auto">
                    {defaultImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Thumbnail"
                        className={`w-16 h-16 rounded-md cursor-pointer border-2 transition ${
                          selectedImage === img ? "border-blue-500 scale-105" : "border-transparent"
                        }`}
                        onClick={() => {
                          setSelectedImage(img);
                          setCurrentIndex(index);
                        }}
                      />
                    ))}
                  </div>

                  <button
                    className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2"
                    onClick={handleNext}
                  >
                    <FaChevronRight className="text-xl text-gray-600" />
                  </button>
                </div>
              )}
            </div>

            <div className="w-1/2 p-4 flex flex-col justify-between">
              <h2 className="text-2xl font-bold text-gray-800">{product.description}</h2>
              <p className="text-red-500 font-semibold text-sm mt-1">🔥 5 sold in last 20 hours</p>
              <div className="text-gray-600 text-sm mt-2">
                <p>
                  <span className="font-bold">Product Code:</span> AH-214
                </p>
                <p>
                  <span className="font-bold">Availability:</span>{" "}
                  <span className="text-green-600">In stock</span>
                </p>
              </div>
              <div className="mt-3 text-lg font-semibold">
                <span className="text-gray-500 line-through text-xl">₹{product.price}</span>
                <span className="text-green-600 text-2xl ml-2">₹{product.discountedPrice}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-xl">Quantity:</span>
                <div className="flex border-2">
                  <button className="px-4 border-r-2" onClick={decreaseQuantity}>
                    <FaMinus />
                  </button>
                  <span className="px-4 border-r-2 font-bold text-xl">{quantity}</span>
                  <button className="px-4" onClick={increaseQuantity}>
                    <FaPlus />
                  </button>
                </div>
              </div>

              <p className="text-lg text-gray-700 font-semibold mt-3">
                Subtotal: <span className="text-green-600 text-xl">₹{quantity * product.discountedPrice}</span>
              </p>

              <button
                className={`mt-5 ${
                  isAddingToCart ? "bg-gray-500" : "bg-orange-500 hover:bg-orange-600"
                } text-white font-bold py-3 rounded-sm w-full text-lg`}
                onClick={(e) => handleAddToCart(e, product._id, quantity)}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding to Cart..." : "ADD TO CART"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickView;