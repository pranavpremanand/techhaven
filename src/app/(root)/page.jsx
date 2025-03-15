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

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
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
            <h3 className="text2 font-semibold">Portable Pocket Projector</h3>
            <p>
              New Release Wireless Headphone from SoundPro Sound Technology.
              Using Bluetooth 5.0, Noice Canceling and APTX Technology to make a
              good experience when listening to music.
            </p>
            <h4 className="text3">
              Start From <br /> $15,99
            </h4>
            <Link href="/" className="primary-btn w-[12rem]">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
      <FeaturedProductsSection />
      <EditorsBestChoice />
      <BrandLogos />
    </>
  );
}
