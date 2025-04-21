import toast from "react-hot-toast";
import { createOrder, verifyPayment } from "./api";
import axios from "axios";
import { companyDetails } from "@/content/constant";

export const doPayment = async ({
  isExpressDelivery,
  userData,
  setPageLoader,
}) => {
  const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.trim();
  try {
    // Step 1: Create a Razorpay order using Axios
    const response = await createOrder({ isExpressDelivery });
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
        setPageLoader(true);
        // Handle successful payment
        console.log("Payment successful:", response);
        // toast.success("Payment successful! Order placed.");

        // Step 3: Verify payment on your server using Axios
        try {
          const verifyResponse = await verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.data.success) {
            // toast.success("Payment verified! Order placed.");
            const body = `Order placed successfully.\n
            Payment ID: ${response.razorpay_payment_id}\n
            Order ID: ${order.id}\n
            Amount: ${order.amount / 100} ${order.currency}\n\n\n
            Shipping Address:\n
            Name: ${userData.firstName} ${userData.lastName}\n
            Email: ${userData.email}\n
            Phone: ${userData.phone}\n
            Address: ${userData.address}\n
            City: ${userData.city}\n
            State: ${userData.state}\n
            Pincode: ${userData.pinCode}\n
            Landmark: ${userData.note}\n
            Express Delivery: ${isExpressDelivery ? "Yes" : "No"}\n\n\n

            Products:\n
            ${verifyResponse.data.user.cartItems.map((product) => {
              return `${product.productId.productName} - ${
                product.quantity
              } x ${Math.round(
                product.productId.price -
                  (product.productId.price *
                    product.productId.offerPercentage) /
                    100
              )}\n`;
            })}
            `;

            const payload = {
              to: `${companyDetails.email}`,
              body: body,
              subject: "New Order Placed - Payment Received",
              name: "ARK For Ease",
            };

            await axios.post(
              "https://send-mail-redirect-boostmysites.vercel.app/send-email",
              payload
            );

            toast.success("Payment successful! Order placed.");
            window.location.href = "/order/success";
            setPageLoader(false);
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
      toast.error(
        error.response.data.message || "Payment failed. Please try again."
      );
    } else if (error.request) {
      // No response received from the server
      toast.error(
        "No response from the server. Please check your internet connection."
      );
    } else {
      // Something else went wrong
      toast.error("Payment failed. Please try again.");
    }
  }
};
