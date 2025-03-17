import Link from "next/link";
import React from "react";

const Page = () => {
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

  return (
    <div className="">
      <table className="hidden lg:table min-w-full bg-white/15 border border-white">
        <thead>
          <tr className="bg-white/15">
            <th className="py-2 px-4 border-b text-left">ORDER ID</th>
            <th className="py-2 px-4 border-b text-left">STATUS</th>
            <th className="py-2 px-4 border-b text-left">DATE</th>
            <th className="py-2 px-4 border-b text-left">TOTAL</th>
            <th className="py-2 px-4 border-b text-left">ACTION</th>
            <th className="py-2 px-4 border-b text-left">INVOICE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b text-sm font-semibold">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">{order.date}</td>
              <td className="py-2 px-4 border-b">{order.total}</td>
              <td className="py-2 px-4 border-b text-primary hover:text-white">
                <Link href="/order/1">{order.action}</Link>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="primary-btn !px-3 !py-2 hover:!translate-y-0">
                  Download Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-sm bg-white/15 space-y-2"
          >
            <p className="text-sm font-semibold">Order ID: {order.id}</p>
            <p
              className={`text-sm ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {order.status}
            </p>
            <p className="text-sm">Date: {order.date}</p>
            <p className="text-sm">Total: {order.total}</p>
            <div className="mt-4 flex sm:flex-row flex-col sm:items-center gap-4">
              <Link href="/order/1" className="text-primary hover:text-white text-sm">
                {order.action}
              </Link>
              <button className="primary-btn !px-3 !py-2">
                Download Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
