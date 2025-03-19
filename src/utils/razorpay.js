import Razorpay from "razorpay";
import toast from "react-hot-toast";
import { createOrder } from "./api";
import axios from "axios";

export const doPayment = async ({ isExpressDelivery, userData }) => {
    const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.trim();
console.log("Key being used:", rzpKey);
  try {
    // Step 1: Create a Razorpay order using Axios
    const response = await createOrder({ isExpressDelivery });
    console.log(response);
    const { order } = response.data;

    // Step 2: Open Razorpay payment modal
    const options = {
      key: rzpKey, // Use environment variable
      amount: order.amount, // Amount in paise
      currency: order.currency,
      name: "",
      description: "Payment for your order",
      order_id: order.id, // Razorpay order ID
      handler: async function (response) {
        // Handle successful payment
        console.log("Payment successful:", response);
        toast.success("Payment successful! Order placed.");

        // Step 3: Verify payment on your server using Axios
        try {
          const verifyResponse = await axios.post("/api/verifyRazorpayPayment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.data.success) {
            toast.success("Payment verified! Order placed.");
            // Redirect to order confirmation page or perform other actions
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: userData.firstName + " " + userData.lastName,
        email: userData.email,
        contact: userData.phone,
      },
      theme: {
        color: "#568fad", // Customize the modal theme
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Error during payment:", error);
    if (error.response) {
      // Server responded with an error
      toast.error(error.response.data.message || "Payment failed. Please try again.");
    } else if (error.request) {
      // No response received from the server
      toast.error("No response from the server. Please check your internet connection.");
    } else {
      // Something else went wrong
      toast.error("Payment failed. Please try again.");
    }
  }
};