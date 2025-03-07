"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductCardItem = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-primary rounded-2xl space-y-3 overflow-hidden transition-all duration-300"
    >
      <Link
        href="/products/1"
        className="aspect-square flex justify-center items-center relative"
      >
        <Image
          src={item.image}
          objectFit="cover"
          className="group-hover:scale-100 scale-90 group-hover:translate-y-3 transition-all duration-300 z-[1] relative"
          alt={item.title}
          width={350}
          height={350}
        />
        <div className="absolute h-full w-full inset-0 bg-white rounded-2xl aspect-square group-hover:rotate-12 group-hover:scale-75 transition-all duration-300 z-0" />
      </Link>
      <div className="p-5 flex flex-col items-center space-y-2">
        <Link
          href="/products/1"
          className="text-lg text-center link hover:!text-black"
        >
          {item.title}
        </Link>
        <p className="pb-3">
          <del className="text-gray-300">{item.price}</del> -{" "}
          <span className="text-white">{item.offerPrice}</span>
        </p>
        <Link
          href="/products/1"
          className="uppercase underline underline-offset-4 text-white hover:text-black transition-all duration-300 tracking-wide"
        >
          Add to cart
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCardItem;
