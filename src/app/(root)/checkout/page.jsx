"use client";

import { RiCoupon3Line } from "react-icons/ri";
import pincodes from "indian-pincodes";
import { State, City } from "country-state-city";
import { useContext, useEffect, useState } from "react";
import RecentlyViewed from "@/components/RecentlyViewed";
import { featuredProducts } from "@/content/constant";
import { motion } from "framer-motion";
import { getCartData, getUserAddresses, createUserAddress } from "@/utils/api";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import { SpinnerContext } from "@/components/SpinnerContext";
import { doPayment } from "@/utils/razorpay";
import Script from "next/script";
import { addressSchema } from "@/utils/schemas";

const page = () => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN")) || [];
  const [defaultAddressExist, setDefaultAddressExist] = useState(false);
  const [userData, setUserData] = useState(null);
  const { setPageLoader } = useContext(SpinnerContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [expressDeliveryCharge, setExpressDeliveryCharge] = useState(0);
  const [isExpressDelivery, setIsExpressDelivery] = useState(false); // State for delivery option
  const [edittingUserData, setEdittingUserData] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "all",
  });

  // Get cart data
  const getCartList = async () => {
    const res = await getCartData();
    if (res.data.cart) {
      setCartItems(res.data.cart.items);
      setExpressDeliveryCharge(res.data.cart.isExpressDeliveryFee);
      setSubtotal(res.data.cart.totalPrice);
      setTotal(res.data.cart.totalPrice); // Initialize total with subtotal
    }
  };

  // Function to fetch user address
  const fetchUserAddress = async () => {
    const res = await getUserAddresses();
    let data;
    if (res.data.address) {
      data = res.data.address.addresses.find((item) => item.isDefault);
      setUserData(data);
      setDefaultAddressExist(true);
    }
    // Set default values from API response
    setValue("firstName", data?.firstName || "");
    setValue("lastName", data?.lastName || "");
    setValue("email", data?.email || "");
    setValue("phone", data?.phone || "");
    setValue("pinCode", data?.pinCode || "");
    setValue("address", data?.address || "");
    setValue("note", data?.note || "");
    setValue("city", data?.city || "");
    setValue("state", data?.state || "");
    setValue("country", "India");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageLoader(true);
        // Call getCartList
        await getCartList();

        // Call fetchUserAddress
        await fetchUserAddress();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setPageLoader(false);
      }
    };

    fetchData();
  }, []);

  // Update total when delivery option changes
  useEffect(() => {
    if (isExpressDelivery) {
      setTotal(subtotal + expressDeliveryCharge); // Add express delivery charge
    } else {
      setTotal(subtotal); // Reset to subtotal for normal delivery
    }
  }, [isExpressDelivery, subtotal]);

  const onSubmit = async (data) => {
    try {
      const res = await createUserAddress(data);
      if (res.data.success) {
        setUserData(res.data);
        setDefaultAddressExist(true);
        toast.success(res.data.message);
        setEdittingUserData(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // Function to handle proceed to payment
  const handleProceedToPayment = async () => {
    if (!userData) {
      toast.error("Please add address to proceed", { id: "error" });
      return;
    }

    doPayment({ isExpressDelivery, userData });
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="header-height">
        <div className="section-py wrapper space-y-14">
          {cartItems.length > 0 ? (
            <div className="flex flex-col md:grid grid-cols-2 lg:grid-cols-[auto,30rem] gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-5">
                  <h2 className="text3">Shipping Details</h2>
                  {defaultAddressExist && (
                    <Link
                      href="/profile/manage-addresses"
                      className="flex items-center gap-1 h-fit group link"
                    >
                      Change Selected Address{" "}
                      <AiFillCaretRight
                        size={20}
                        className="group-hover:rotate-90 transition-all duration-300"
                      />
                    </Link>
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                    {/* First Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">First Name</label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.firstName && (
                        <small className="text-red-600">
                          {errors.firstName.message}
                        </small>
                      )}
                    </div>
                    {/* Last Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">Last Name</label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.lastName && (
                        <small className="text-red-600">
                          {errors.lastName.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">Email Address</label>
                      <input
                        type="email"
                        {...register("email")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.email && (
                        <small className="text-red-600">
                          {errors.email.message}
                        </small>
                      )}
                    </div>
                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">Phone Number</label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.phone && (
                        <small className="text-red-600">
                          {errors.phone.message}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Address</label>
                    <input
                      type="text"
                      {...register("address")}
                      className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                      onFocus={() => setEdittingUserData(true)}
                    />
                    {errors.address && (
                      <small className="text-red-600">
                        {errors.address.message}
                      </small>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                    {/* Landmark */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">Landmark</label>
                      <input
                        type="text"
                        {...register("note")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.note && (
                        <small className="text-red-600">
                          {errors.note.message}
                        </small>
                      )}
                    </div>
                    {/* Pincode */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">Pincode</label>
                      <input
                        type="text"
                        {...register("pinCode", {
                          onChange: (e) => {
                            const pincode = e.target.value;
                            if (pincode.length === 6) {
                              const details = pincodes.getPincodeDetails(
                                Number(pincode)
                              );
                              if (details) {
                                setValue("city", details.division);
                                setValue("state", details.state);
                                setError("city", null);
                                setError("state", null);
                              }
                            }
                          },
                        })}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        maxLength={6}
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.pinCode && (
                        <small className="text-red-600">
                          {errors.pinCode.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
                    {/* City */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">City</label>
                      <input
                        type="text"
                        {...register("city")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      />
                      {errors.city && (
                        <small className="text-red-600">
                          {errors.city.message}
                        </small>
                      )}
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm">State</label>
                      <select
                        {...register("state")}
                        className="py-3 px-2 bg-white text-black rounded-xl outline-none w-full"
                        onFocus={() => setEdittingUserData(true)}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <small className="text-red-600">
                          {errors.state.message}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  {!userData || (userData && edittingUserData) ? (
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="primary-btn w-full !rounded-xl"
                      >
                        Add Address
                      </button>
                    </div>
                  ) : null}
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#252525] p-5 rounded-xl !h-fit"
              >
                <div className="space-y-6">
                  <h5 className="text-lg font-semibold text-center">
                    Your Order Summary
                  </h5>
                  <div className="space-y-5">
                    {cartItems.length > 0 &&
                      cartItems.map((product) => (
                        <div
                          key={product.productId._id}
                          className="grid grid-cols-[2rem,auto,auto] gap-2 sm:gap-5"
                        >
                          <span>{product.quantity}x</span>
                          <p>{product.productId.productName}</p>
                          <span className="text-end">
                            ₹ {product.subtotal}{" "}
                          </span>
                        </div>
                      ))}
                  </div>
                  <hr className="border-white/50" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>₹ {subtotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Shipping</span>
                      <span>
                        {isExpressDelivery
                          ? `₹ ${expressDeliveryCharge}`
                          : "Free"}
                      </span>
                    </div>
                    {/* Delivery Option */}
                    <div className="flex flex-col gap-3">
                      <span>Delivery Option</span>
                      <div className="grid grid-cols-2 items-center gap-3 text-center">
                        <div
                          className={`p-2 text-sm rounded-sm cursor-pointer transition-all duration-300 ${
                            !isExpressDelivery
                              ? "bg-primary text-white"
                              : "bg-[#484848] text-gray-400"
                          }`}
                          onClick={() => setIsExpressDelivery(false)}
                        >
                          <p>Normal Delivery</p>
                          <p
                            className={`text-xs ${
                              isExpressDelivery ? "text-gray-400" : "text-white"
                            }`}
                          >
                            6-8 days
                          </p>
                        </div>
                        <div
                          className={`p-2 text-sm rounded-sm cursor-pointer transition-all duration-300 ${
                            isExpressDelivery
                              ? "bg-primary text-white"
                              : "bg-[#484848] text-gray-400"
                          }`}
                          onClick={() => setIsExpressDelivery(true)}
                        >
                          <p>Express Delivery</p>
                          <p
                            className={`text-xs ${
                              !isExpressDelivery
                                ? "text-gray-400"
                                : "text-white"
                            }`}
                          >
                            3-4 days
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="border-white/50" />
                    <div className="flex text-lg items-center justify-between">
                      <span>Total</span>
                      <span>₹ {total}</span>
                    </div>
                  </div>
                  {userData && (
                    <button
                      onClick={handleProceedToPayment}
                      className="primary-btn w-full !rounded-xl"
                    >
                      Proceed to Payment
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center justify-center min-h-[40vh]">
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
      </div>
    </>
  );
};

export default page;
