"use client";

import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import OrderCard from "@/components/admin/dashboard/OrderCard";
import SalesGraph from "@/components/admin/dashboard/SalesGraph";
import StatCard from "@/components/admin/dashboard/StatCard";
import TableRow from "@/components/admin/dashboard/TableRow";
import { getDashboardStats } from "@/utils/adminApi";
import { useQuery } from "@tanstack/react-query";
import {
  FiTrendingUp,
  FiPackage,
  FiUsers as FiUsersIcon,
  FiDollarSign,
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import IsFetchingLoader from "@/components/IsFetchingLoader";
import DataFetchError from "@/components/DataFetchError";

const Dashboard = () => {
  const {
    data: dashboardData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 2, // Retry twice before failing
  });

  if (isLoading) {
    return (
      <PrivateRoute>
        <IsFetchingLoader />
      </PrivateRoute>
    );
  }

  if (isError) {
    return (
      <PrivateRoute>
        <DataFetchError error={error} />
      </PrivateRoute>
    );
  }

  const {
    totalOrders,
    totalUsers,
    totalProducts,
    totalSales,
    salesChange,
    ordersChange,
    usersChange,
    salesData,
    recentOrders,
  } = dashboardData.data.data;

  // Transform API data for the stats cards
  const statsData = [
    {
      icon: <FiTrendingUp size={24} className="text-white" />,
      title: "Total Orders",
      value: `${totalOrders.toLocaleString()} Orders`,
      change: ordersChange,
      comparison: "Compared to 1 month ago",
    },
    {
      icon: <FiPackage size={24} className="text-white" />,
      title: "Total Products",
      value: totalProducts.toLocaleString(),
    },
    {
      icon: <FiUsersIcon size={24} className="text-white" />,
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      change: usersChange,
      comparison: "Compared to 1 month ago",
    },
    {
      icon: <FiDollarSign size={24} className="text-white" />,
      title: "Total Sales",
      value: `₹ ${totalSales.toLocaleString()}`,
      change: salesChange,
      comparison: "Compared to 1 month ago",
    },
  ];

  return (
    <PrivateRoute>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-400 block">
              Home &gt; Dashboard
            </span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              comparison={stat.comparison}
            />
          ))}
        </div>

        {/* Graph section */}
        <SalesGraph graphData={salesData} />

        {/* Recent orders table */}
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <TableRow
                      key={order._id}
                      orderId={order._id}
                      date={new Date(order.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                      customer={order.userId.fullName}
                      amount={order.amount.toLocaleString()}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {recentOrders.map((order) => (
              <OrderCard
                key={order._id}
                orderId={order.orderId}
                date={new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                customer={order.userId.fullName}
                amount={order.amount.toLocaleString()}
              />
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
