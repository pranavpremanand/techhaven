"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { productImages } from "@/content/constant";
import { addToCart, deleteCartItem } from "@/utils/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "@/store/features/cartSlice";

const CartItem = ({ item, cartItems }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(item.subtotal);

  // decrement quantity
  const decrementQuantity = async () => {
    if (quantity > 1) {
      try {
        const updatedQty = quantity - 1;
        const res = await addToCart({
          productId: item.productId._id,
          quantity: updatedQty,
        });
        if (res.data.cart) {
          setQuantity(updatedQty);
          const productAmt =
            item.productId.price * (1 - item.productId.offerPercentage / 100);
          const subTotal = productAmt * updatedQty;
          setSubtotal(subTotal);
          dispatch(
            addItemToCart({
              ...item,
              quantity: updatedQty,
              subtotal: subTotal,
            })
          );
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  };

  // increment quantity
  const incrementQuantity = async () => {
    try {
      const updatedQty = quantity + 1;
      const res = await addToCart({
        productId: item.productId._id,
        quantity: updatedQty,
      });
      if (res.data.cart) {
        setQuantity(updatedQty);
        const productAmt =
          item.productId.price * (1 - item.productId.offerPercentage / 100);

        const subTotal = productAmt * updatedQty;
        setSubtotal(subTotal);
        dispatch(
          addItemToCart({
            ...item,
            quantity: updatedQty,
            total: subTotal,
          })
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // remove item
  const handleRemoveItem = async () => {
    try {
      const res = await deleteCartItem(item.productId._id);
      if (res.data.success) {
        dispatch(removeItemFromCart(item.productId._id));
        toast.success("Item removed from cart");
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
      className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4 bg-white text-black p-5 rounded-xl shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <Link href={`/product/${item.productId._id}`} className="flex-shrink-0">
          <Image
            src={productImages.mainImage}
            alt={item.productId.productName}
            width={80}
            height={80}
            className="aspect-square lg:w-full lg:h-full h-[10rem] w-[10rem] object-cover rounded-xl"
          />
        </Link>
        <div className="flex flex-col text-center sm:text-start justify-between gap-2">
          <h5 className="text-lg font-medium">{item.productId.productName}</h5>
          <h4 className="text-xl font-semibold text-primary">₹{subtotal}</h4>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto justify-center sm:justify-end">
        <div className="px-3 py-2 flex gap-3 border rounded-xl border-primary">
          <button onClick={decrementQuantity} className="hover:opacity-70">
            <FaMinus size={15} />
          </button>
          <span className="text-xl w-[2rem] text-center">{quantity}</span>
          <button onClick={incrementQuantity} className="hover:opacity-70">
            <FaPlus size={15} />
          </button>
        </div>
        <button
          onClick={handleRemoveItem}
          className="p-3 flex gap-3 border rounded-xl border-primary hover:bg-red-50 transition-colors"
        >
          <RiDeleteBin6Line size={20} />
        </button>
        {/* <button className="p-3 flex gap-3 border rounded-xl border-primary hover:bg-red-50 transition-colors">
          <IoIosHeart size={20} className="text-red-600" /> */}
        {/* <IoIosHeartEmpty size={20} className="text-red-600" /> */}
        {/* </button> */}
      </div>
    </motion.div>
  );
};

export default CartItem;
