"use client";

import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import DataFetchError from "@/components/DataFetchError";
import IsFetchingLoader from "@/components/IsFetchingLoader";
import ProductGridItem from "@/components/admin/products/ProductGridItem";
import { getDashboardStats, getProducts } from "@/utils/adminApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const page = () => {
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 2, // Retry twice before failing
  });

  if (isLoading) {
    return <IsFetchingLoader />;
  }

  if (isError) {
    return <DataFetchError error={error} />;
  }

  console.log(products.data);

  return (
    <PrivateRoute>
      <div className="space-y-6 text-black">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-400 block">Home &gt; All Products</span>
          </div>
          <Link href="/admin/products/add" className="primary-btn">
            Add Product
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {products.data.map((item) => (
            <ProductGridItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default page;
