"use client";

import SliderWithThumbnails from "@/components/productDetails/SliderWithThumbnails";
import RecentlyViewed from "@/components/RecentlyViewed";
import RatingStars from "@/components/StarRating";
import Link from "next/link";
import { FaTruckFast } from "react-icons/fa6";
import { RxCaretRight } from "react-icons/rx";
import { RiBox3Fill } from "react-icons/ri";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import AddToCartSection from "@/components/productDetails/AddToCartSection";
import { motion } from "framer-motion";
import { createUrlParam } from "@/utils/helper";
import { categories } from "@/components/Header";
import { useParams } from "next/navigation";
import { getSingleProduct } from "@/utils/api";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "@/components/SpinnerContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { pageLoader, setPageLoader } = useContext(SpinnerContext);
  const [error, setError] = useState(false);

  const getProduct = async () => {
    try {
      setPageLoader(true);
      const res = await getSingleProduct(id);
      if (res.data) {
        setProduct(res.data);
      } else {
        setError(true);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setError(true);
    } finally {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product && pageLoader) {
    return null;
  }
  if (!product && !pageLoader && error) {
    return (
      <div className="header-height">
        <div className="wrapper section-py min-h-[40vh] flex items-center justify-center">
          <h1 className="text-center text3">Product not found</h1>
        </div>
      </div>
    );
  }
  if (!product) return <LoadingSpinner />;
  return (
    <>
      <div className="header-height">
        <div className="wrapper section-py space-y-7 md:space-y-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[25rem,auto] xl:grid-cols-[30rem,auto] gap-10 w-full">
            <div className="w-full">
              <SliderWithThumbnails />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full space-y-7"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <Link href="/products/electronics-and-gadgets">Products</Link>
                <RxCaretRight size={20} />
                <p className="text-primary">{product.productName}</p>
              </div>
              <div className="space-y-2">
                {/* <div className="flex gap-3">
                  5.0
                  <RatingStars
                    rating={5}
                    size={14}
                    className="text-yellow-400"
                  />
                </div> */}
                <h1 className="text3">{product.productName}</h1>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text3 font-semibold inline-block">
                  ₹
                  {product.price -
                    (product.price * product.offerPercentage) / 100}
                </h3>
                <del className="text-gray-500">₹{product.price}</del>
              </div>
              <div className="flex sm:flex-row flex-col gap-5 sm:gap-8">
                <div className="flex items-center gap-2">
                  <FaTruckFast size={25} className="text-primary" />
                  Free Delivery
                </div>
                {/* <div className="flex items-center gap-2">
                  <RiBox3Fill size={25} className="text-primary" />
                  Free Delivery
                </div> */}
                {/* <button className="group flex items-center gap-2 hover:text-primary transition-all duration-200">
                  <IoIosHeart
                    size={25}
                    className="text-red-600 group-hover:text-primary transition-all duration-200"
                  /> */}
                {/* <IoIosHeartEmpty size={25} className="text-red-600" /> */}
                {/* Add to Wishlist
                </button> */}
              </div>
              <div className="space-y-1">
                <h5 className="text-lg">Description</h5>
                <p>{product.description}</p>
              </div>
              <AddToCartSection product={product} />
            </motion.div>
          </div>
          <hr className="border-primary max-w-lg mx-auto" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h5 className="text-lg font-semibold">Description</h5>
            <p>{product.description}</p>
          </motion.div>
        </div>
        {/* <RecentlyViewed /> */}
      </div>
    </>
  );
};

export default page;
