"use client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { productImages } from "@/content/constant";
import { getOrderDetailsById } from "@/utils/api";
import InvoicePDF from "@/utils/helper";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);

  const getOrderDetails = async () => {
    try {
      setIsLoading(true);
      const res = await getOrderDetailsById(id);
      if (res.data.success) {
        setOrder(res.data.order);
        setAddress(res.data.address);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center min-h-[40vh]">
        <h1 className="text-center text3">No orders found!</h1>
        <Link href="/products/electronics-and-gadgets" className="primary-btn">
          Shop Now
        </Link>
      </div>
    );
  }

  const invoiceData = {
    invoiceNo: order.orderNo,
    date: new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    total: order.amount,
    products: order.cartItems.map((product) => ({
      name: product.productId.productName,
      quantity: product.quantity,
      price:
        product.productId.price -
        (product.productId.price * product.productId.offerPercentage) / 100,
    })),
    deliveryCharge: order.isExpressDelivery ? (200).toLocaleString() : "Free",
    address: {
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      address: address.address,
      note: address.note,
      city: address.city,
      state: address.state,
      pinCode: address.pincode,
      country: address.country,
      phone: address.phone,
    },
  };

  return (
    <div className="wrapper header-height pt-7">
      <div className="bg-white/15 rounded-lg shadow-md p-5">
        <h2 className="text-xl font-medium mb-4">Order Details</h2>
        <div className="space-y-2">
          <p className="text-sm font-medium">Order ID: {order._id}</p>
          {/* <p
            className={`text-sm ${
              order.status === "Delivered"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Status: {order.status}
          </p> */}
          <p className="text-sm">
            Date:{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="text-sm">
            Delivery Charge: {order.isExpressDelivery ? "₹200" : "Free"}
          </p>
          <p className="text-sm font-medium">
            Total: ₹{order.amount.toLocaleString()}
          </p>
        </div>

        <h3 className="text-lg font-medium mt-6">Products</h3>
        <div className="mt-2 border rounded-lg p-4 bg-white/10">
          {order.cartItems.map((product) => (
            <div
              key={product.productId._id}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={productImages.mainImage}
                  alt={product.productId.productName}
                  className="w-10 h-10 rounded-md object-contain"
                />
                <p className="text-sm">
                  {product.productId.productName} (x{product.quantity})
                </p>
              </div>
              <p className="text-sm font-medium">
                ₹
                {product.productId.price -
                  (product.productId.price *
                    product.productId.offerPercentage) /
                    100}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-5 mt-6 items-center">
          <InvoicePDF invoiceData={invoiceData} />
          {/* <button
            onClick={()=>generatePDF(invoiceData)}
            className="primary-btn !px-3 !py-2 hover:!translate-y-0"
          >
            Download Invoice
          </button> */}
          <Link href="/profile/orders" className="link text-sm">
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
