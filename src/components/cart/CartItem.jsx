"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({
  item,
  setCartItems,
  cartItems,
  setSelectedItems,
  selectedItems,
}) => {
  const [quantity, setQuantity] = useState(item.cartQuantity);

  // decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, cartQuantity: quantity - 1 };
        }
        return cartItem;
      })
    }
  };

  // increment quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, cartQuantity: quantity + 1 };
      }
      return cartItem;
    })
    setCartItems(updatedCartItems);
  };

  // remove item
  const handleRemoveItem = () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  // select item
  const handleSelectItem = () => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      : [...selectedItems, item];
    setSelectedItems(updatedSelectedItems);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4 bg-white text-black p-5 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <input
          checked={selectedItems.includes(item)}
          onChange={handleSelectItem}
          type="checkbox"
          className="accent-primary w-4 h-4 cursor-pointer self-start sm:self-auto"
        />
        <Link href={`/products/${item.id}`} className="flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="aspect-square lg:w-full lg:h-full h-[10rem] w-[10rem] object-cover rounded-xl"
          />
        </Link>
        <div className="flex flex-col justify-between gap-2">
          <h5 className="text-lg font-medium">{item.title}</h5>
          <h4 className="text-xl font-semibold text-primary">₹{item.price}</h4>
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
        <button className="p-3 flex gap-3 border rounded-xl border-primary hover:bg-red-50 transition-colors">
          <IoIosHeart size={20} className="text-red-600" />
          {/* <IoIosHeartEmpty size={20} className="text-red-600" /> */}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
