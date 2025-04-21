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
import { setLoading } from "@/store/features/loaderSlice";
import SkeletonLoading from "@/components/SkeletonLoading";

const page = () => {
  useAuth();
  const shippingCharge = 0;
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.loader);

  // Update total summary
  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const subTotal = cartItems.reduce((acc, item) => {
      const productAmt = item.subtotal;
      return acc + productAmt;
    }, 0);
    setSubtotal(subTotal);
    setTotal(subTotal + shippingCharge);
  };

  // Get cart data
  const getCartList = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getCartData();
      if (res.data.cart) {
        console.log(res.data.cart)
        dispatch(setCartItems(res.data.cart.items));
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <>
      <div className="space-y-7">
        <div className="header-height section-py">
          {cartItems.length > 0 ? (
            <div className="wrapper grid grid-cols-1 lg:grid-cols-[auto,20rem] gap-8">
              <section className="space-y-5">
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="space-y-3">
                      <SkeletonLoading
                        height="auto"
                        className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4 p-5 rounded-xl shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                          <div className="h-[6rem] w-[6rem] object-cover rounded-xl bg-gray-300 animate-pulse"></div>
                          <div className="flex flex-col text-center sm:text-start justify-between gap-4">
                            <div className="h-5 bg-gray-300 animate-pulse w-[8rem] rounded-lg"></div>
                            <div className="h-5 bg-gray-300 animate-pulse w-[8rem] rounded-lg"></div>
                          </div>
                        </div>
                      </SkeletonLoading>
                      <SkeletonLoading
                        height="auto"
                        className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4 p-5 rounded-xl shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                          <div className="h-[6rem] w-[6rem] object-cover rounded-xl bg-gray-300 animate-pulse"></div>
                          <div className="flex flex-col text-center sm:text-start justify-between gap-4">
                            <div className="h-5 bg-gray-300 animate-pulse w-[8rem] rounded-lg"></div>
                            <div className="h-5 bg-gray-300 animate-pulse w-[8rem] rounded-lg"></div>
                          </div>
                        </div>
                      </SkeletonLoading>
                    </div>
                  ) : (
                    cartItems.length > 0 &&
                    cartItems.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        cartItems={cartItems}
                      />
                    ))
                  )}
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
                    <span>Free</span>
                    {/* <span>₹{shippingCharge}</span> */}
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
          ) : (
            <div className="wrapper section-py flex flex-col space-y-5 items-center justify-center">
              <h1 className="text-center text3">No items in cart</h1>
              <Link
                href="/products/electronics-and-gadgets"
                className="primary-btn"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
        {/* <RecentlyViewed /> */}
      </div>
    </>
  );
};

export default page;
