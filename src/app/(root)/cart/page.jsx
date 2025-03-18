"use client";

import CartItem from "@/components/cart/CartItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { addToCart, getCartData } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, setCartItems } from "@/store/features/cartSlice";

const page = () => {
  useAuth();
  const shippingCharge = 200;
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Update total summary
  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => {
      const productAmt =
        item.productId.price * (1 - item.productId.offerPercentage / 100);
      return acc + productAmt * item.quantity;
    }, 0);
    setSubtotal(subtotal);
    setTotal(subtotal + shippingCharge);
  };

  // Get cart data
  const getCartList = async () => {
    try {
      const res = await getCartData();
      if (res.data.cart) {
        dispatch(setCartItems(res.data.cart.items));
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <>
      <div className="space-y-7">
        <div className="header-height section-py">
          <div className="wrapper grid grid-cols-1 lg:grid-cols-[auto,20rem] gap-8">
            <section className="space-y-5">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    cartItems={cartItems}
                  />
                ))}
              </div>
            </section>
            <section className="space-y-5">
              {/* Summary */}
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
                    <Link
                      href="/products/electronics-and-gadgets"
                      className="link"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
        {/* <RecentlyViewed /> */}
      </div>
    </>
  );
};

export default page;
