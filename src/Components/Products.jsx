import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar, FaHeart, FaEye } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./comman.css";
import { useFunction } from "./FunctionContext";
import Practice from "./QuickView"; // Quick View Component
import { useApi } from "./ApiContext";
import { useCart } from "./CartContext";

const Products = ({ category, head }) => {
  const {increaseCartValue}=useCart();
  const { setQuantity } = useFunction();
  const { allProductsData, isLoading, error } = useApi();
  const { handleClickbtn } = useFunction();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for Quick View modal
  const [loadingProducts, setLoadingProducts] = useState({}); // State to track loading products

  const sliderRef = useRef(null);

  useEffect(() => {
    if (allProductsData?.allProducts) {
      const x = allProductsData?.allProducts?.filter((item) => item.category === category);
      setProducts(x);
      setAdditionalProducts(x.slice(6));
    }
  }, [allProductsData]);

  const scrollLeft = () => {
    const cardWidth = sliderRef.current.clientWidth / getCardsPerView();
    sliderRef.current.scrollBy({ left: -cardWidth * getCardsPerView(), behavior: "smooth" });
  };

  const scrollRight = () => {
    const cardWidth = sliderRef.current.clientWidth / getCardsPerView();
    sliderRef.current.scrollBy({ left: cardWidth * getCardsPerView(), behavior: "smooth" });
  };

  const getCardsPerView = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const addToCart = async (e, productId, quantity) => {
    handleClickbtn(e); // Prevent default button behavior
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    // Set loading state for the product
    setLoadingProducts((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await fetch("http://localhost:2100/cart/cartadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });

      const data = await response.json();
      if (response.ok) {
        setQuantity(1);
        increaseCartValue();
        alert("Item added to cart successfully!");
        navigate("/cartDetails");
      } else {
        throw new Error(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert("Something went wrong while adding to cart.");
    } finally {
      // Reset loading state for the product
      setLoadingProducts((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const renderProductCard = (product) => (
    <div className="bg-white rounded-lg p-4 m-2 flex-1 transition-shadow duration-300 hover:shadow-md relative group">
      <div className="absolute top-2 right-2 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FaHeart className="text-red-500 cursor-pointer" size={24} />
      </div>
      <div className="absolute top-0 left-0 z-[2] bg-red-500 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg">
        {product?.discount}% Off
      </div>
      <div className="relative">
        <img src={product?.url} alt={product?.name} className=" w-full object-cover rounded-md" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded flex items-center space-x-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
          >
            <FaEye size={18} />
            <span>Quick View</span>
          </button>
        </div>
      </div>
      <h2 className="mt-2 text-orange-500 text-lg line-clamp-2 head">{product?.description}</h2>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-green-500" size={16} />
        ))}
        <p className="ml-2 text-gray-600">{product?.reviews} reviews</p>
      </div>
      <p className="text-red-500 font-bold">
        MRP: <span className="line-through decoration-2"> ₹{product?.price}</span>
      </p>
      <p className="text-green-500 font-bold head">Discounted Price: ₹{product?.discountedPrice}</p>
      <div className="mt-[1rem] flex justify-center">
        <button
          className={`${
            loadingProducts[product._id] ? "bg-gray-500" : "bg-orange-500"
          } text-white py-2 px-4 w-full rounded`}
          onClick={(e) => addToCart(e, product._id, 1)}
          disabled={loadingProducts[product._id]}
        >
          {loadingProducts[product._id] ? "Adding to Cart..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold head">{head}</h1>
        <p className="text-orange-500 font-semibold hover:underline head cursor-pointer" onClick={() => navigate("/viewAllSkincareProducts", { state: { category: category, head: head } })}>
          View All
        </p>
      </div>

      <div className="flex items-center overflow-hidden relative">
        <button onClick={scrollLeft} className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full shadow-md">
          <FaArrowLeft size={20} />
        </button>

        <div ref={sliderRef} className="flex overflow-x-auto space-x-4 hide scroll-smooth snap-x snap-mandatory">
          {products?.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 snap-start cursor-pointer" onClick={() => navigate("/ProductDetails", { state: { product } })}>
              {renderProductCard(product)}
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="absolute right-0 z-10 bg-gray-200 p-2 rounded-full shadow-md">
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="flex justify-center flex-wrap">
        {additionalProducts?.map((product, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2 cursor-pointer" onClick={() => navigate("/ProductDetails", { state: { product } })}>
            {renderProductCard(product)}
          </div>
        ))}
      </div>

      {selectedProduct && <Practice product={selectedProduct} addToCart={addToCart} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default Products;