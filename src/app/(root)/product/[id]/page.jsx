"use client";

import SliderWithThumbnails from "@/components/productDetails/SliderWithThumbnails";
import RecentlyViewed from "@/components/RecentlyViewed";
import RatingStars from "@/components/StarRating";
import Link from "next/link";
import { FaTruckFast } from "react-icons/fa6";
import { RxCaretRight } from "react-icons/rx";
import { RiBox3Fill } from "react-icons/ri";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import AddToCartSection from "@/components/productDetails/AddToCartSection";
import { motion } from "framer-motion";
import { createUrlParam } from "@/utils/helper";
import { categories } from "@/components/Header";
import { useParams } from "next/navigation";
import { getSingleProduct } from "@/utils/api";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "@/components/SpinnerContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { pageLoader, setPageLoader } = useContext(SpinnerContext);
  const [error, setError] = useState(false);

  const getProduct = async () => {
    try {
      setPageLoader(true);
      const res = await getSingleProduct(id);
      if (res.data) {
        setProduct(res.data);
      } else {
        setError(true);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setError(true);
    } finally {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product && pageLoader) {
    return null;
  }
  if (error) {
    return (
      <div className="header-height">
        <div className="wrapper section-py min-h-[40vh] flex items-center justify-center">
          <h1 className="text-center text3">Product not found</h1>
        </div>
      </div>
    );
  }
  if (!product) return <LoadingSpinner />;
  return (
    <>
      <div className="header-height">
        <div className="wrapper section-py space-y-7 md:space-y-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[25rem,auto] xl:grid-cols-[30rem,auto] gap-10 w-full">
            <div className="w-full">
              <SliderWithThumbnails />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full space-y-7"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <Link href="/products/electronics-and-gadgets">Products</Link>
                <RxCaretRight size={20} />
                <p className="text-primary">{product.productName}</p>
              </div>
              <div className="space-y-2">
                {/* <div className="flex gap-3">
                  5.0
                  <RatingStars
                    rating={5}
                    size={14}
                    className="text-yellow-400"
                  />
                </div> */}
                <h1 className="text3">{product.productName}</h1>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text3 font-semibold inline-block">
                  ₹
                  {product.price -
                    (product.price * product.offerPercentage) / 100}
                </h3>
                <del className="text-gray-500">₹{product.price}</del>
              </div>
              <div className="flex sm:flex-row flex-col gap-5 sm:gap-8">
                <div className="flex items-center gap-2">
                  <FaTruckFast size={25} className="text-primary" />
                  Free Delivery
                </div>
                {/* <div className="flex items-center gap-2">
                  <RiBox3Fill size={25} className="text-primary" />
                  Free Delivery
                </div> */}
                {/* <button className="group flex items-center gap-2 hover:text-primary transition-all duration-200">
                  <IoIosHeart
                    size={25}
                    className="text-red-600 group-hover:text-primary transition-all duration-200"
                  /> */}
                {/* <IoIosHeartEmpty size={25} className="text-red-600" /> */}
                {/* Add to Wishlist
                </button> */}
              </div>
              <div className="space-y-1">
                <h5 className="text-lg">Description</h5>
                {/* <p>{product.description}</p> */}
              </div>
              <AddToCartSection product={product} />
            </motion.div>
          </div>
          <hr className="border-primary max-w-lg mx-auto" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h5 className="text-lg font-semibold">Description</h5>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
            {/* <div className="mx-shadow-lg rounded-lg">
              <h1 className="text-3xl font-semibold">
                ARK FOR EASE Long-Range Walkie Talkie
              </h1>
              <p className="text-gray-300 mt-2">
                16 Channel, 5 KM Range, Portable Two-Way Radio Set (Black, Pack
                of 2)
              </p>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Product Highlights
                </h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>
                    <strong>Long Range Walkie Talkie:</strong> Stay connected up
                    to 5KM outdoors, ideal for various activities.
                  </li>
                  <li>
                    <strong>16 Channel Two-Way Radio:</strong> Ensures clear,
                    interference-free communication.
                  </li>
                  <li>
                    <strong>Rechargeable Battery:</strong> Long-lasting
                    lithium-ion batteries for up to 48 hours of standby.
                  </li>
                  <li>
                    <strong>Lightweight & Portable:</strong> Weighs only 400g,
                    perfect for kids and adults.
                  </li>
                  <li>
                    <strong>Built-in LED Flashlight:</strong> Useful for night
                    adventures and emergencies.
                  </li>
                  <li>
                    <strong>Clear Sound with Noise Reduction:</strong>{" "}
                    Crystal-clear audio even in noisy environments.
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Advanced Features
                </h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>Time-Out Timer – Promotes responsible usage.</li>
                  <li>
                    Monitor Button – Scan frequencies and reduce background
                    noise.
                  </li>
                  <li>
                    Customizable Function Key – For scanning or emergency alert
                    setup.
                  </li>
                  <li>
                    LED Indicator Light – Shows transmitting, receiving, and
                    battery status.
                  </li>
                  <li>
                    Power/Volume Control Knob – Simple operation for all users.
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Mounting Hardware
                </h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>2 Walkie Talkies – Lightweight and easy to use.</li>
                  <li>
                    2 Rechargeable Batteries – Long-lasting lithium-ion
                    batteries.
                  </li>
                  <li>2 Chargers – Keep the devices powered up.</li>
                  <li>2 Antennas – Ensures strong signal reception.</li>
                  <li>2 Back Splints – Added support for durability.</li>
                  <li>2 Straps – Adjustable for easy carrying.</li>
                  <li>1 User Manual – Quick setup guide.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Battery Details & Power Efficiency
                </h2>
                <p className="text-gray-300 mt-2">
                  <strong>Battery Life:</strong> Up to 10 hours of continuous
                  usage and 48 hours of standby.
                  <br />
                  <strong>Batteries Included:</strong> Yes
                  <br />
                  <strong>Battery Type:</strong> Lithium-Ion – High efficiency
                  and long-lasting performance.
                  <br />
                  <strong>Rechargeable:</strong> Yes – No frequent replacements
                  needed.
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Key Features & Benefits
                </h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>
                    <strong>Extended Range (5 Km):</strong> Reliable
                    long-distance communication.
                  </li>
                  <li>
                    <strong>Built-in Flashlight:</strong> Ideal for nighttime
                    adventures.
                  </li>
                  <li>
                    <strong>16 Channels:</strong> Ensures clear communication.
                  </li>
                  <li>
                    <strong>2W Output Power:</strong> Strong signal for
                    crystal-clear voice transmission.
                  </li>
                  <li>
                    <strong>Battery Saving Mode:</strong> Enhances battery life.
                  </li>
                  <li>
                    <strong>Low Battery Warning:</strong> Prevents sudden
                    shutdowns.
                  </li>
                  <li>
                    <strong>Noise Reduction:</strong> Clear audio even in loud
                    environments.
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-200">
                  Where Can It Be Used?
                </h2>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                  <li>
                    <strong>Kids' Communication:</strong> Fun and safe for
                    children.
                  </li>
                  <li>
                    <strong>Outdoor Adventures:</strong> Perfect for camping,
                    hiking, and trekking.
                  </li>
                  <li>
                    <strong>Road Trips & Caravans:</strong> Stay in touch while
                    traveling separately.
                  </li>
                  <li>
                    <strong>Logistics:</strong> Warehouse and delivery team
                    coordination.
                  </li>
                  <li>
                    <strong>Transportation:</strong> Used by drivers and
                    dispatch teams.
                  </li>
                  <li>
                    <strong>Shopping Malls:</strong> Security and management
                    coordination.
                  </li>
                  <li>
                    <strong>Tourism:</strong> Seamless communication for guides
                    and groups.
                  </li>
                  <li>
                    <strong>Construction Sites:</strong> Essential for workers
                    and site managers.
                  </li>
                  <li>
                    <strong>Restaurants:</strong> Enhances teamwork between
                    staff.
                  </li>
                </ul>
              </div>
            </div> */}
          </motion.div>
        </div>
        {/* <RecentlyViewed /> */}
      </div>
    </>
  );
};

export default page;
