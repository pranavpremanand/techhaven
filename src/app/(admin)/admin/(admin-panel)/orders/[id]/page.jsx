"use client";

import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import DataFetchError from "@/components/DataFetchError";
import IsFetchingLoader from "@/components/IsFetchingLoader";
import { getOrderById } from "@/utils/adminApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const res = await getOrderById(id);
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
      <div className="space-y-6 text-black">
        {/* Breadcrumb navigation */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-400 block">
              Home &gt; Orders List &gt; Order Details
            </span>
          </div>
        </div>

        {/* Order ID Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Orders ID: <span className="text-primary">#{data._id}</span>
          </h2>

          {/* Deliver To Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Deliver to</h3>
            {data.address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{`${data.address.firstName} ${data.address.lastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{data.address.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{data.address.phone}</p>
                </div>
              </div>
            ) : data.addressInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{`${data.addressInfo.firstName} ${data.addressInfo.lastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{data.addressInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{data.addressInfo.phone}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <p className="text-sm text-gray-500">Address Not Found</p>
                <div>
                  <p className="text-sm text-gray-500">User Name</p>
                  <p className="font-medium">{data.userId.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{data.userId.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* View Profile Section */}
          {data.address ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="text-gray-600 space-y-1">
                  <p>{data.address.address}</p>
                  <p>Pincode : {data.address.pinCode}</p>
                  <p>Landmark : {data.address.note}</p>
                  <p>
                    {data.address.city}, {data.address.state},{" "}
                    {data.address.country}
                  </p>
                </div>
              </div>
            </div>
          ) : data.addressInfo ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <div className="text-gray-600 space-y-1">
                  <p>{data.addressInfo.address}</p>
                  <p>Pincode : {data.addressInfo.pinCode}</p>
                  <p>Landmark : {data.addressInfo.note}</p>
                  <p>
                    {data.addressInfo.city}, {data.addressInfo.state},{" "}
                    {data.addressInfo.country}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Products</h3>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span>{item.productId.productName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        ₹ {item.totalprice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {data.cartItems.map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.productId.productName}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">
                      ₹ {item.totalprice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₹ {(data.amount - data.deliveryCharge).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping Rate</span>
                  <span className="font-medium">
                    ₹ {data.deliveryCharge.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">
                    ₹ {data.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default OrderDetails;
