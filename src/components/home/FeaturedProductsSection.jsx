"use client";

import Heading from "../Heading";
import ProductCardItem from "../ProductCardItem";
import Link from "next/link";
import Image from "next/image";
import { featuredProducts } from "@/content/constant";
import { useState } from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { motion } from "framer-motion";

const FeaturedProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="section-py">
      <div className="wrapper space-y-8">
        <Heading title="Featured Products" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((item) => (
            <ProductCardItem key={item.id} item={item} />
          ))}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
            className="!row-start-1 sm:col-span-2 md:col-span-3 lg:col-start-4 lg:row-span-2 lg:col-span-1 bg-[#C4C4C4] text-white p-5 grid sm:grid-cols-2 lg:flex flex-col justify-between items-center gap-8 rounded-2xl lg:text-center"
          >
            <div className="flex flex-col lg:items-center gap-4 lg:gap-8">
              <h3 className="text3 font-semibold">BEST PRODUCT DEALS</h3>
              <p>
                Get a 20% Cashback when buying TWS Product From SoundPro Audio
                Technology.
              </p>
              <Link
                href="/products"
                className="uppercase btn bg-black text-white hover:bg-primary w-fit"
              >
                Shop Now
              </Link>
            </div>
            <Image
              src="/images/best-product-deals.jpeg"
              alt="best product deals"
              width={1000}
              height={1000}
              className="object-cover rounded-2xl h-full lg:h-[60%] object-[70%_40%]"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="flex justify-center items-center gap-5"
        >
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`p-1 min-w-[3rem] h-[2rem] flex items-center justify-center rounded-lg ${
                currentPage === n
                  ? "bg-white text-black"
                  : "text-white bg-[#313131] hover:bg-primary transition-all duration-300"
              }`}
            >
              {n}
            </button>
          ))}
          <button className="hover:bg-primary transition-all duration-300 p-1 min-w-[3rem] h-[2rem] flex items-center justify-center rounded-lg text-white bg-[#313131]">
            <PiCaretRightBold size={21} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
