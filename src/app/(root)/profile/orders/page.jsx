"use client";

import { getAllOrders } from "@/utils/api";
// import { generatePDF } from "@/utils/helper";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [ordersList, setOrdersList] = useState([]);
  const orders = [
    {
      id: "#96459761",
      status: "Yet to be Delivered",
      date: "Dec 30, 2019 07:52",
      total: "$80 (5 Products)",
      action: "View Details →",
    },
    {
      id: "#71667167",
      status: "Delivered",
      date: "Dec 7, 2019 23:26",
      total: "$70 (4 Products)",
      action: "View Details →",
    },
    {
      id: "#95214362",
      status: "Yet to be Delivered",
      date: "Dec 7, 2019 23:26",
      total: "$2,300 (2 Products)",
      action: "View Details →",
    },
  ];

  // get all orders
  const getOrders = async () => {
    try {
      const res = await getAllOrders();
      if (res.data.order) {
        console.log(res.data);
        setOrdersList(res.data.order);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="">
      {ordersList.length > 0 ? (
        <div className="">
          <table className="hidden lg:table min-w-full bg-white/15 border border-white">
            <thead>
              <tr className="bg-white/15">
                <th className="py-2 px-4 border-b text-left">ORDER ID</th>
                {/* <th className="py-2 px-4 border-b text-left">STATUS</th> */}
                <th className="py-2 px-4 border-b text-left">DATE</th>
                <th className="py-2 px-4 border-b text-left">TOTAL</th>
                <th className="py-2 px-4 border-b text-left"></th>
                {/* <th className="py-2 px-4 border-b text-left">INVOICE</th> */}
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order, index) => (
                <tr key={order._id} className="py-1">
                  <td className="py-2 px-4 border-b">#{order._id}</td>
                  {/* <td className="py-2 px-4 border-b text-sm font-semibold">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </td> */}
                  <td className="py-2 px-4 border-b">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td>
                    <Link
                      href={`/order/${order._id}`}
                      className="primary-btn !rounded-none"
                    >
                      View Details
                    </Link>
                  </td>
                  {/* <td className="py-2 px-4 border-b">
                    <button
                      // onClick={() => generatePDF(order)}
                      className="primary-btn !px-3 !py-2 hover:!translate-y-0"
                    >
                      Download Invoice
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {ordersList.map((order, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-white/15 space-y-2"
              >
                <p className="text-sm font-semibold">Order ID: #{order._id}</p>
                {/* <p
                  className={`text-sm ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
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
                  Total: ₹{order.amount.toLocaleString()}
                </p>
                <div className="mt-4 flex sm:flex-row flex-col sm:items-center gap-4">
                  <Link
                    href={`/order/${order._id}`}
                    className="primary-btn !rounded-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl text-white">No Orders Found</div>
      )}
    </div>
  );
};

export default Page;
