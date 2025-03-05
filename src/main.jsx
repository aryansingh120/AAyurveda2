import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FunctionProvider } from "./Components/FunctionContext.jsx";
import { ApiProvider } from "./Components/ApiContext.jsx"; // ✅ Import ApiProvider
import ScrollToTop from "./Components/ScrollTop.jsx";
import { CartProvider } from "./Components/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter >
      <ApiProvider> {/* Wrap with ApiProvider */}
        <FunctionProvider>
        <ScrollToTop/>
        <CartProvider>
         <App />
         </CartProvider>
        </FunctionProvider>
      </ApiProvider>
    </BrowserRouter>
  </StrictMode>
);
