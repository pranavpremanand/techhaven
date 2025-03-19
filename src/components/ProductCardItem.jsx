"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { addToCart } from "@/utils/api";
import toast from "react-hot-toast";
import { productImages } from "@/content/constant";

const ProductCardItem = ({ item }) => {
  const addItemToCart = async () => {
    try {
      const res = await addToCart({ productId: item._id, quantity: 1 });
      if (res.data.cart) {
        toast.success("Item added to cart");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-primary rounded-2xl space-y-3 overflow-hidden transition-all duration-300 relative"
    >
      {/* <button className="absolute z-50 right-2 top-2">
       <IoIosHeart
          size={25}
          className="text-red-600"
        />
        <IoIosHeartEmpty size={25} className="text-red-600" />
      </button> */}
      <Link
        href={`/product/${item._id}`}
        className="aspect-square flex justify-center items-center relative"
      >
        <Image
          src={productImages.mainImage}
          objectFit="cover"
          className="group-hover:scale-100 scale-90 group-hover:translate-y-3 transition-all duration-300 z-[1] relative"
          alt={item.productName}
          width={350}
          height={350}
        />
        <div className="absolute h-full w-full inset-0 bg-white rounded-2xl aspect-square group-hover:rotate-12 group-hover:scale-75 transition-all duration-300 z-0" />
      </Link>
      <div className="p-5 flex flex-col items-center space-y-2">
        <Link
          href={`/product/${item._id}`}
          className="text-lg text-center link hover:!text-black"
        >
          {item.productName}
        </Link>
        <p className="pb-3">
          {/* <del className="text-gray-300">₹{item.price}</del> -{" "} */}
          <span className="text-white">
            ₹{item.price * (1 - item.offerPercentage / 100)}
          </span>
        </p>
        <button
          onClick={addItemToCart}
          className="uppercase underline underline-offset-4 text-white hover:text-black transition-all duration-300 tracking-wide"
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCardItem;
