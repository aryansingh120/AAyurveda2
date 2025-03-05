import React, { useState, useEffect } from "react";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./comman.css";
import { useFunction } from "./FunctionContext";
import Practice from "./QuickView"; // Quick View Component
import { useApi } from "./ApiContext";

const AllProducts = () => {
  const { handleClickbtn } = useFunction();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for Quick View modal
  const location=useLocation();
  const category=location?.state?.category;
  const head=location?.state?.head;
  

  const {isLoading, error,allProductsData } = useApi();
  useEffect(() => {

    if (allProductsData?.allProducts) {
      const x=allProductsData?.allProducts?.filter((item)=>item.category===category)
      console.log("data=>",x);
      setProducts(x);
    }
  }, [allProductsData]);

  
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
        <button className="bg-orange-500 text-white py-2 px-4 w-full rounded" onClick={handleClickbtn}>
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl sm:text-3xl font-bold head mb-4">{head}</h1>

      <div className="flex justify-center flex-wrap">
        {products?.map((product, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2 cursor-pointer" onClick={() => navigate("/ProductDetails", { state: { product } })}>
            {renderProductCard(product)}
          </div>
        ))}
      </div>

      {selectedProduct && <Practice product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default AllProducts;