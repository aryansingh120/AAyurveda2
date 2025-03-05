import { createContext, useContext, useState } from "react";

const FunctionContext = createContext();

export const FunctionProvider = ({ children }) => {
  const [quantity,setQuantity]=useState(1);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

// ****************************************************


// ****************************************************


  const handleClickbtn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <FunctionContext.Provider value={{ handleClickbtn,quantity,decreaseQuantity,increaseQuantity,setQuantity }}>
      {children}
    </FunctionContext.Provider>
  );
};

// ✅ Correct way to export and use context
export const useFunction = () => {
  return useContext(FunctionContext);
};
