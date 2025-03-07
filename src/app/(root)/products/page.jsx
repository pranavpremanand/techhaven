"use client";
import BrandLogos from "@/components/BrandLogos";
import EditorsBestChoice from "@/components/EditorsBestChoice";
import Footer from "@/components/Footer";
import Header, { categories } from "@/components/Header";
import ProductCardItem from "@/components/ProductCardItem";
import RecentlyViewed from "@/components/RecentlyViewed";
import { featuredProducts } from "@/content/constant";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="header-height">
      <Header />
      <div className="wrapper section-py">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="primary-btn my-7 lg:mb-7 lg:mt-0"
        >
          {showFilter ? "Hide Filter" : "Show Filter"}
        </button>
        <div
          className={`grid ${showFilter && "md:grid-cols-[15rem,1fr]"} gap-10`}
        >
          <div
            className={`${
              showFilter ? "w-full h-fit" : "h-0 absolute opacity-0"
            } border border-primary rounded-2xl p-6 space-y-5 transition-all duration-300 ease-in-out`}
          >
            <div className="space-y-4">
              <h5 className="text-lg font-semibold">All Categories</h5>
              <ul className="space-y-3">
                {categories.map((item) => (
                  <li key={item.name}>
                    <Link href={`/products`} className="link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-primary" />
            <div className="space-y-4">
              <h5 className="text-lg font-semibold">Sort By</h5>
              <ul className="space-y-3">
                <li>
                  <Link href={`/products`} className="link">
                    Relevance
                  </Link>
                </li>
                <li>
                  <Link href={`/products`} className="link">
                    Price: Low to High
                  </Link>
                </li>
                <li>
                  <Link href={`/products`} className="link">
                    Price: High to Low
                  </Link>
                </li>
                <li>
                  <Link href={`/products`} className="link">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-8 transition-all duration-300 ease-in-out`}
          >
            {featuredProducts.concat(featuredProducts).map((item) => (
              <ProductCardItem key={Math.random()} item={item} />
            ))}
          </div>
        </div>
        <EditorsBestChoice />
        <RecentlyViewed />
      </div>
      <BrandLogos />
      <Footer />
    </div>
  );
};

export default page;
