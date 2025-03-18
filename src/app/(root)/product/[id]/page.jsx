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

const page = () => {
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
                <p className="text-primary">Product Name</p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-3">
                  5.0
                  <RatingStars
                    rating={5}
                    size={14}
                    className="text-yellow-400"
                  />
                </div>
                <h1 className="text3">
                  ASUS ROG Strix G16 (2024), 16 "(40.64cm) QHD+ 240Hz, Intel
                  Core i9 14900HX, Gaming Laptop 
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text3 font-semibold inline-block">₹8990.00</h3>
                <del className="text-gray-500">₹9990.00</del>
              </div>
              <div className="flex sm:flex-row flex-col gap-5 sm:gap-8">
                <div className="flex items-center gap-2">
                  <FaTruckFast size={25} className="text-primary" />
                  Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <RiBox3Fill size={25} className="text-primary" />
                  Free Delivery
                </div>
                <button className="group flex items-center gap-2 hover:text-primary transition-all duration-200">
                  <IoIosHeart
                    size={25}
                    className="text-red-600 group-hover:text-primary transition-all duration-200"
                  />
                  {/* <IoIosHeartEmpty size={25} className="text-red-600" /> */}
                  Add to Wishlist
                </button>
              </div>
              <div className="space-y-1">
                <h5 className="text-lg">Description</h5>
                <p>
                  ASUS ROG Strix G16 (2024), 16 "(40.64cm) QHD+ 240Hz, Intel
                  Core i9 14900HX, Gaming Laptop (16GB DDR5/1TB SSD/NVIDIA
                  GeForce RTX 4070 /Windows 11/Office 2021/Eclipse Gray/2.50
                  Kg), G614JIR-N4062WS <br /> Keyboard: Backlit Chiclet Keyboard
                  Per-Key RGB
                </p>
              </div>
              <AddToCartSection />
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
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga,
              esse eveniet. Incidunt explicabo et, reprehenderit eos iste
              architecto eaque velit alias aperiam quae nulla odit fuga at hic
              maiores illum. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Fuga, esse eveniet. Incidunt explicabo et, reprehenderit eos
              iste architecto eaque velit alias aperiam quae nulla odit fuga at
              hic maiores illum.
              <br />
              Fuga, esse eveniet. Incidunt explicabo et, reprehenderit eos iste
              architecto eaque velit alias aperiam quae nulla odit fuga at hic
              maiores illum. Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Fuga, esse eveniet. Incidunt explicabo et, reprehenderit eos
              iste architecto eaque velit alias aperiam quae nulla odit fuga at
              hic maiores illum.
            </p>
          </motion.div>
        </div>
        <RecentlyViewed />
      </div>
    </>
  );
};

export default page;
