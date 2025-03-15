"use client";

import CartItem from "@/components/cart/CartItem";
import RecentlyViewed from "@/components/RecentlyViewed";
import { featuredProducts } from "@/content/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [cartItems, setCartItems] = useState(featuredProducts.slice(0, 4));
  const [selectedItems, setSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCharge = 50;
  const [total, setTotal] = useState(0);

  //   update total summary
  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.cartQuantity,
      0
    );
    setSubtotal(total);
    setTotal(total + shippingCharge);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedItems([]);
    } else {
      setSelectAll(true);
      setSelectedItems(cartItems);
    }
  };

  //   remove selected items
  const handleRemoveSelectedItems = () => {
    const updatedCartItems = cartItems.filter(
      (item) => !selectedItems.includes(item)
    );
    setCartItems(updatedCartItems);
    setSelectedItems([]);
    setSelectAll(false);
  };

  return (
    <>
      <div className="space-y-7">
        <div className="header-height section-py">
          <div className="wrapper grid grid-cols-1 lg:grid-cols-[auto,20rem] gap-8">
            <section className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#504A4A] rounded-xl p-5 flex justify-between gap-7"
              >
                <div
                  onClick={handleSelectAll}
                  className="flex items-center gap-3 cursor-pointer link"
                >
                  <input
                    type="checkbox"
                    name=""
                    className="accent-white w-4 h-4 cursor-pointer"
                    id=""
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <span>{selectAll ? "Deselect All" : "Select All"}</span>
                </div>
                <button
                  onClick={handleRemoveSelectedItems}
                  className="uppercase tracking-wide link"
                >
                  Remove
                </button>
              </motion.div>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    setCartItems={setCartItems}
                    cartItems={cartItems}
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                  />
                ))}
              </div>
            </section>
            <section className="space-y-5">
              {/* summary */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-5 space-y-3 border border-white rounded-xl"
              >
                <div className="flex items-center gap-5">
                  <h6 className="text-lg">Summary</h6>
                  <span className="h-[1px] w-full bg-[#FFF323]" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCharge}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="space-y-6 pt-5">
                  <Link href="/checkout" className="primary-btn w-full">
                    Checkout
                  </Link>
                  <div className="flex justify-center">
                    <Link href="/products" className="link">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
        <RecentlyViewed />
      </div>
    </>
  );
};

export default page;
