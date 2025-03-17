"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import RatingStars from "./StarRating";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const ProductCardItem2 = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      key={item.id}
      className="grid md:grid-cols-2 gap-2 sm:gap-5 mb-6"
    >
      <Link
        href="/products/1"
        className="group hover:brightness-75 transition-all duration-300 aspect-square md:h-full w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center"
      >
        <Image
          src={item.image}
          alt={item.title}
          width={400}
          height={400}
          className="object-contain aspect-square"
        />
      </Link>
      <div className="space-y-2 flex flex-col justify-between py-1">
        <div className="flex justify-between gap-2">
          <Link href="/products/1" className="text-lg link">
            {item.title}
          </Link>
          {/* <button className="h-fit min-w-[1.5rem]">
            <IoIosHeart
              size={25}
              className="text-red-600 group-hover:text-primary transition-all duration-200"
            />
            <IoIosHeartEmpty size={25} className="text-red-600" />
          </button> */}
        </div>
        <div className="sm:space-y-3">
          <p className="text-primary text-lg">₹{item.price}</p>
          <div className="flex items-center gap-2">
            <RatingStars rating={item.rating} size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardItem2;
