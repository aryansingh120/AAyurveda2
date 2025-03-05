import React, { useState, useRef } from "react";
import { FaStar, FaPlus, FaMinus, FaPercent, FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";
import { Plus, Minus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../assets/product.webp";
import img2 from "../assets/img1.webp";
import img3 from "../assets/img2.webp";
import img4 from "../assets/img3.webp";
import img5 from "../assets/img4.webp";
import img6 from "../assets/img5.webp";
import Review from "./Reviews";
import { useFunction } from "./FunctionContext";

const ProductDetails = () => {
  const { quantity, decreaseQuantity, increaseQuantity, setQuantity } = useFunction();
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the expansion of the "Key Features" card
  const location = useLocation();
  const product = location.state?.product;
  const thumbnailRef = useRef(null);
  const arr = [product?.url, img2, img3, img4, img5, img6, img1, img2, img3];
  const [selectedImage, setSelectedImage] = useState(arr[0]);
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Loading state for "Add to Cart"
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded); // Function to toggle the expansion state

  const featureData = [
    {
      title: "Key Features",
      content:
        "Get brighter and illuminated skin with Glowelle Vitamin C 20% Face Serum. Infused with Orange, Lemon, and Witch Hazel, this lightweight formula absorbs quickly to provide a natural glow, even out skin tone and texture, and reduce the appearance of fine lines and wrinkles. Suitable for both men and women, this 30 ML bottle provides antioxidant protection against environmental stressors while leaving your skin feeling soft and hydrated.",
    },
    {
      title: "How to use:",
      content:
        "Suitable for both men and women, this 30 ML bottle provides antioxidant protection against environmental stressors.",
    },
  ];
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFeature = (index) => {
    if (openIndexes.includes(index)) {
      // If already open, close it
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // Otherwise, open it
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsAddingToCart(true); // Set loading state

    try {
      const response = await fetch("https://aayurveda-hn8w.onrender.com/cart/cartadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuantity(1);
        // alert("Item added to cart successfully!");
        navigate("/cartDetails");
      } else {
        throw new Error(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      // alert("Something went wrong while adding to cart.");
    } finally {
      setIsAddingToCart(false); // Reset loading state
    }
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 mb-4">
          <div className="relative">
            <div className="absolute -top-2 left-0 bg-red-600 px-3 py-1 text-sm text-white">
              -{product.discount}%
            </div>
            <img src={selectedImage} alt="Product" className="mx-auto w-full max-w-[600px]" />
            <div className="flex items-center justify-center gap-2 mt-3 border">
              <button onClick={scrollLeft} className="bg-gray-200 p-2 rounded-full shadow-md">
                <FaChevronLeft size={20} />
              </button>
              <div ref={thumbnailRef} className="flex gap-2 overflow-x-scroll border hide w-[80%] scrollbar-hide">
                {arr.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Thumbnail"
                    className={`w-16 h-16 cursor-pointer border-2 transition-transform duration-200 ${selectedImage === img ? 'border-orange-500 scale-110' : 'border-gray-300'}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              <button onClick={scrollRight} className="bg-gray-200 p-2 rounded-full shadow-md">
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-500">{product.description}</h1>

            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-orange-500" size={20} />
              ))}
              <p className="ml-2 text-gray-600">{product.reviews} reviews</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-red-600 font-bold text-2xl">MRP:</span>
                <span className="line-through text-red-600 text-2xl">₹{product.price}</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{product.discountedPrice}
                </span>
                <span className="text-xl font-bold text-orange-500">You Save</span>
                <span className="text-xl font-bold text-green-600">
                  ₹{product.price - product.discountedPrice}
                </span>
              </div>
              <p className="text-sm text-gray-500">Inc. of all taxes</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-2xl">Quantity:</span>
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

            <p className="text-md">
              Subtotal:{" "}
              <span className="text-green-500 font-bold">₹{product.discountedPrice * quantity}</span>
            </p>

            <div className="flex gap-4">
              <button
                className={`flex-1 ${
                  isAddingToCart ? "bg-gray-500" : "bg-orange-500 hover:bg-orange-600"
                } text-white p-3 rounded-lg font-bold`}
                onClick={addToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding to Cart..." : "ADD TO CART"}
              </button>
              <Link to="/orderAddress" className="flex-1">
                <button className="w-full border border-gray-300 font-bold p-3 rounded-lg hover:bg-orange-500 hover:text-white transition">
                  BUY IT NOW
                </button>
              </Link>
            </div>

            <div className="p-4 border rounded-lg shadow-lg bg-[#F5F5F5]">
              <h3 className="mb-3 font-semibold">Available offers</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Additional 5% discounts on all orders of 600+",
                  "Flat 25% discount on selected combos",
                  "Free Shipping on orders above ₹500",
                ].map((offer, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <FaPercent className="text-green-600" /> {offer}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded-lg shadow-lg bg-[#F5F5F5] w-full space-y-3">
              {featureData.map((feature, index) => (
                <div key={index} className="w-full rounded-lg">
                  <button
                    onClick={() => toggleFeature(index)}
                    className={`group flex justify-between items-center w-full cursor-pointer p-3 rounded-t-lg transition-all ${
                      openIndexes.includes(index) ? "bg-orange-500 text-white" : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    <span
                      className={`text-[18px] font-medium ${
                        openIndexes.includes(index) ? "text-white" : "text-[#444444] group-hover:text-white"
                      }`}
                    >
                      {feature.title}
                    </span>
                    <span className="text-lg font-bold">
                      {openIndexes.includes(index) ? (
                        <Minus size={24} className={`${openIndexes.includes(index) ? "text-white" : "text-[#444444] group-hover:text-white"}`} />
                      ) : (
                        <Plus size={24} className="text-[#444444] group-hover:text-white" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openIndexes.includes(index) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="p-3 bg-white rounded-b-lg">{feature.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Review />
    </div>
  );
};

export default ProductDetails;