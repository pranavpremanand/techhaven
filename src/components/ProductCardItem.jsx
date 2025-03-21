"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addToCart } from "@/utils/api";
import toast from "react-hot-toast";
import { productImages } from "@/content/constant";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductCardItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [itemIsInCart, setItemIsInCart] = useState(item.itemIsInCart);
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(
    item.price * (1 - item.offerPercentage / 100) * quantity
  );

  const handleAddToCart = async (newQuantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      router.push("/signin");
      return;
    }
    try {
      const res = await addToCart({
        productId: item._id,
        quantity: newQuantity,
      });
      if (res.data.cart) {
        toast.success(
          newQuantity === 1 ? "Item added to cart" : "Item updated in cart"
        );
        setItemIsInCart(true);
        setQuantity(newQuantity);
        const productAmt = item.price * (1 - item.offerPercentage / 100);
        setSubtotal(productAmt * newQuantity);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      handleAddToCart(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    handleAddToCart(quantity + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-primary rounded-2xl space-y-3 overflow-hidden transition-all duration-300 relative"
    >
      <Link
        href={`/product/${item._id}`}
        className="aspect-square flex justify-center items-center relative"
      >
        <Image
          src={productImages.mainImage}
          objectFit="cover"
          className="group-hover:scale-100 scale-90 group-hover:translate-y-3 transition-all duration-300 z-[1] relative rounded-2xl"
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
          <span className="text-white">
            ₹{item.price * (1 - item.offerPercentage / 100)}
          </span>
        </p>
        {itemIsInCart ? (
          <div className="px-3 py-2 flex gap-3 border rounded-xl border-primary">
            <button
              onClick={decrementQuantity}
              className="hover:opacity-70 w-[2rem] h-[2rem] rounded-sm bg-white text-black/80 flex items-center justify-center"
            >
              <FaMinus size={20} />
            </button>
            <span className="text-xl w-[2rem] text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="hover:opacity-70 w-[2rem] h-[2rem] rounded-sm bg-white text-black/80 flex items-center justify-center"
            >
              <FaPlus size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(1)}
            className="uppercase underline underline-offset-4 text-white hover:text-black transition-all duration-300 tracking-wide"
          >
            Add to cart
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCardItem;
