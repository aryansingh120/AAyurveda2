import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const [productId,setProductId]=useState(null)
// *******************************************************************
  const [cartValue, setCartValue] = useState(() => {
    if (!token) return 0; 
    const savedValue = localStorage.getItem("cartValue");
    return savedValue ? JSON.parse(savedValue) : 0;
  });

  const increaseCartValue = () => {
    setCartValue((prev) => {
      const newValue = prev + 1;
      localStorage.setItem("cartValue", JSON.stringify(newValue));
      return newValue;
    });
  };

  const decreaseCartValue = () => {
    setCartValue((prev) => {
      const newValue = prev > 0 ? prev - 1 : 0;
      localStorage.setItem("cartValue", JSON.stringify(newValue));
      return newValue;
    });
  };
// ***********************************************************************
const [product,setProduct]=useState([]);
const [fetchCart,setFetchCart]=useState(0)
const increasefetchCart = () => {
    setFetchCart(prev => prev + 1);
  };
  const decreasefetchCart = () => {
    setFetchCart(prev => prev - 1);
  };
const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://aayurveda-hn8w.onrender.com/cart/allCart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if(response.status===200)
      {

        setProduct(response?.data);
      }
      else
      alert("data not fetched")
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
useEffect(()=>{
    fetchCartItems();
},[fetchCart])
// *************************************************************************
const removeItem = async (cartItemId) => {
  try {
    const response = await axios.post(
      "https://aayurveda-hn8w.onrender.com/cart/deleteCart",
      { productId: cartItemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      console.log("Item deleted");

      setProduct((prevProduct) => ({
        ...prevProduct, 
        allCarts: prevProduct.allCarts.filter(
          (item) => item.productId._id !== cartItemId
        ), 
      }));
    }
  } catch (error) {
    console.error("Error removing item:", error);
  }
};


// *************************************************************************

const handleOrderNow = async (product) => {
  setProductId(product.productId._id)
  try {
   const response= await axios.post(
      "https://aayurveda-hn8w.onrender.com/cart/updateQuantity",
      {
        productId: product.productId._id,
        quantity: product.quantity,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if(response.status==200){
      alert("quantity updated");
      navigate("/orderAddress"); 
    }
    else
    alert("quantity not updated");
  } catch (error) {
    console.error("Error updating quantity in backend:", error);
  }
};

//***************************************************************************

  return (
    <CartContext.Provider value={{ cartValue, setCartValue, increaseCartValue, decreaseCartValue,product,increasefetchCart,removeItem,fetchCart,fetchCartItems,handleOrderNow,productId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
