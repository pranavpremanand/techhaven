"use client";

import Banner from "@/components/home/Banner";
import Flashsale from "@/components/home/Flashsale";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import EditorsBestChoice from "@/components/EditorsBestChoice";
import BrandLogos from "@/components/BrandLogos";
import { motion } from "framer-motion";
import { getAllProducts } from "@/utils/api";
import toast from "react-hot-toast";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const res = await getAllProducts(user?.id);
      // const product1 = {
      //   mainImage: "/images/featured-products/1.png",
      //   images: [
      //     "/images/product-details/1.webp",
      //     "/images/product-details/2.webp",
      //     "/images/product-details/3.webp",
      //     "/images/product-details/4.webp",
      //   ],
      //   ...res.data[0],
      //   category: "Electronics & Gadgets",
      // };
      // const products = [product1];
      if (res.data.success) {
        localStorage.setItem("products", JSON.stringify(res.data.products));
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="">
      <Banner />
      <Flashsale />
      <section className="section-py">
        <div className="wrapper grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {isClient && (
              <ReactPlayer
                url="/videos/portable-pocket-projector.mp4"
                loop
                muted
                width="100%"
                height="100%"
                playsinline
                playing
                className="w-full"
                pip={false}
                config={{
                  file: {
                    attributes: {
                      style: {
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      },
                      controlsList: "nodownload noplaybackrate",
                      disablePictureInPicture: true,
                      playsInline: true,
                    },
                  },
                }}
              />
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <h3 className="text2 font-semibold">Long-Range Walkie-Talkie</h3>
            <p>
              Stay connected with the latest Walkie-Talkie from ComTalk.
              Featuring a <b>10-mile range</b> , <b>crystal-clear sound</b> ,
              and
              <b> noise reduction</b> for seamless communication in any
              environment.
            </p>
            <h4 className="text3">
              Start From <br /> ₹1,999
            </h4>

            <Link
              href="/products/electronics-and-gadgets"
              className="primary-btn w-[12rem]"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
      {/* <FeaturedProductsSection /> */}
      {/* <EditorsBestChoice /> */}
      <BrandLogos />
    </div>
  );
}
