import { useState } from "react";
// import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);
//   const { selectedProductId } = useCart();
const {productId}=useCart();
console.log(productId);

  const navigate = useNavigate();

  // ✅ Order ID + Amount Generate Karne Ka Function
  const generatePaymentOrder = async () => {
    try {
      const response = await fetch("http://localhost:2100/razorpay/generatePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId,
          paymentMethod:"Online"
        }),
      });

      const data = await response.json();
      console.log("🛠️ API Response:", data);

      if (!data.order || !data.order.id || data.order.status !== "created") {
        throw new Error("Order generation failed!");
      }

      console.log("✅ Order ID:", data.order.id);
      console.log("✅ Amount:", data.order.amount / 100, "INR"); // Convert from paise to INR
      return { orderId: data.order.id, amount: data.order.amount };
    } catch (error) {
      console.error("❌ Payment Order Error:", error.message);
    }
  };

  // ✅ Online Payment (Razorpay Checkout Open)
  const handleOnlinePayment = async () => {
    try {
      setLoading(true);

      const { orderId, amount } = await generatePaymentOrder();
      if (!orderId || !amount) throw new Error("Order ID or Amount missing");

      const options = {
        key: "rzp_test_rQNeQgKzbTL3WZ", // Replace with your Razorpay Key
        amount: amount, // ✅ Dynamic Amount
        currency: "INR",
        name: "Your Company",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          console.log("✅ Payment Successful:", response);
          await confirmPayment(response, orderId);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Payment Error:", error);
      alert("Payment Failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Payment Verification Backend Call
  const confirmPayment = async (paymentData, orderId) => {
    try {
      const response = await fetch("http://localhost:2100/razorpay/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...paymentData,
          orderId,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error("Payment verification failed!");

      console.log("✅ Payment Verified:", data);
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Payment Verification Error:", error.message);
    }
  };

  // ✅ Cash on Delivery Order Placement
  const handleCOD = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:2100/cart/aman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId, paymentMethod: "COD" }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Order Placed Successfully!");
      } else {
        alert("Order Placement Failed!");
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Select Payment Method</h2>

      <div className="flex gap-4">
        <button
          onClick={() => setPaymentMethod("COD")}
          className={`p-2 border rounded-md ${paymentMethod === "COD" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          Cash on Delivery
        </button>
        <button
          onClick={() => setPaymentMethod("ONLINE")}
          className={`p-2 border rounded-md ${paymentMethod === "ONLINE" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Online Payment
        </button>
      </div>

      <div className="mt-4">
        {paymentMethod === "ONLINE" && (
          <button
            onClick={handleOnlinePayment}
            className="bg-blue-500 text-white p-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now (Online)"}
          </button>
        )}
        {paymentMethod === "COD" && (
          <button
            onClick={handleCOD}
            className="bg-green-500 text-white p-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order (COD)"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
