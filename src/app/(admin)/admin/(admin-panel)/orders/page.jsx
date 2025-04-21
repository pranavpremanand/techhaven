"use client";

import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import OrderCard from "@/components/admin/dashboard/OrderCard";
import TableRow from "@/components/admin/dashboard/TableRow";
import DataFetchError from "@/components/DataFetchError";
import IsFetchingLoader from "@/components/IsFetchingLoader";
import { getOrders } from "@/utils/adminApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrders] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: async () => {
      const res = await getOrders(currentPage);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <IsFetchingLoader />;
  }

  if (isError) {
    return <DataFetchError error={error} />;
  }

  return (
    <PrivateRoute>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-400 block">Home &gt; Orders List</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white text-black p-4 rounded-lg shadow">
          <h2 className="text-lg mb-4">Recent Orders</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.orders.map((order, index) => (
                    <TableRow
                      key={index}
                      orderId={order._id}
                      date={order.createdAt}
                      customer={order.userId.fullName}
                      amount={order.amount}
                      isLinkVisible={true}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>

                {[...Array(data.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border-t border-b border-gray-300 text-black text-sm font-medium ${
                      currentPage !== i + 1
                        ? "text-gray-700 hover:bg-gray-50"
                        : "bg-primary text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage < data.totalPages
                        ? currentPage + 1
                        : data.totalPages
                    )
                  }
                  disabled={currentPage === data.totalPages}
                  className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </nav>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {data.orders.map((order, index) => (
              <OrderCard
                key={index}
                orderId={order._id}
                date={order.createdAt}
                customer={order.userId.fullName}
                amount={order.amount}
                isLinkVisible={true}
              />
            ))}

            {/* Mobile Pagination */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {data.totalPages}
                </span>
                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage < data.totalPages
                        ? currentPage + 1
                        : data.totalPages
                    )
                  }
                  disabled={currentPage === data.totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
