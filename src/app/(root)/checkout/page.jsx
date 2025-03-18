"use client";

import { RiCoupon3Line } from "react-icons/ri";
import pincodes from "indian-pincodes";
import { State, City } from "country-state-city";
import { useState } from "react";
import RecentlyViewed from "@/components/RecentlyViewed";
import { featuredProducts } from "@/content/constant";
import { motion } from "framer-motion";

const page = () => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN"));
  //   name: "",
  //       email: "",
  //       mobile: "",
  //       pincode: "",
  //       address: "",
  //       landmark: "",
  //       city: "",
  //       state: "",
  return (
    <>
      <div className="header-height">
        <div className="section-py wrapper space-y-14">
          <div className="flex flex-col-reverse md:grid grid-cols-2 lg:grid-cols-[auto,30rem] gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <h2 className="text3">Shipping Details</h2>
              <form className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Full Name</label>
                    <input
                      type="text"
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Email Address</label>
                    <input
                      type="email"
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Phone Number</label>
                    <input
                      type="tel"
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Pincode</label>
                    <input
                      type="text"
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                    />
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap gap-3-sm:5"> */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Address</label>
                  <input
                    type="text"
                    className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Landmark</label>
                  <input
                    type="text"
                    className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                  />
                </div>
                {/* </div> */}
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">City</label>
                    <input
                      type="text"
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">State</label>
                    <input
                      type="text"
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <button
                    type="submit"
                    className="primary-btn w-full !rounded-xl"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#252525] p-5 rounded-xl !h-fit"
            >
              {/* coupon code */}
              <form className="space-y-3 p-5 bg-white text-black rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl">
                    <RiCoupon3Line size={25} color="#77EC3F" />
                  </div>
                  <span>Have a coupon code?</span>
                </div>
                <hr className="border-primary" />
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-full outline-none p-3 rounded-xl border"
                />
                <button className="primary-btn w-full" type="submit">
                  Apply
                </button>
              </form>
              <div className="mt-8 space-y-6">
                <h5 className="text-lg font-semibold text-center">
                  Your Order Summary
                </h5>
                <div className="space-y-5">
                  {featuredProducts.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-[1rem,auto,auto] gap-5"
                    >
                      <span>{product.cartQuantity}x</span>
                      <p>Lorem ipsum dolor sit amet</p>
                      <span className="text-end">₹ 1000 </span>
                    </div>
                  ))}
                </div>
                <hr className="border-white/50" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>₹ 3000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>₹ 50</span>
                  </div>
                  <hr className="border-white/50" />
                  <div className="flex text-lg items-center justify-between">
                    <span>Total</span>
                    <span>₹ 3050</span>
                  </div>
                  {/* <div className="space-y-6 pt-5">
                    <button className="primary-btn w-full">Place Order</button>
                    <div className="flex justify-center">
                      <Link href="/products/electronics-and-gadgets" className="link">
                        Back to Cart
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>
          <RecentlyViewed />
        </div>
      </div>
    </>
  );
};

export default page;
