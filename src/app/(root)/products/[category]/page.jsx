"use client";
import BrandLogos from "@/components/BrandLogos";
import EditorsBestChoice from "@/components/EditorsBestChoice";
import { categories } from "@/components/Header";
import ProductCardItem from "@/components/ProductCardItem";
import RecentlyViewed from "@/components/RecentlyViewed";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getAllProducts } from "@/utils/api";
import toast from "react-hot-toast";

const page = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const params = useParams();
  const category = categories.find((item) =>
    item.url.includes(params.category)
  );

  const getProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const res = await getAllProducts(user?._id);
      if (res.data.products.length > 0) {
        const products = res.data.products.map((item) => ({
          ...item,
          category: "Electronics & Gadgets",
        }));
        localStorage.setItem("products", JSON.stringify(products));
        const updatedList = products.filter(
          (item) => item.category === category.name
        );
        setFilteredProducts(updatedList);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="header-height wrapper section-py">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="primary-btn my-7 lg:mb-7 lg:mt-0"
        >
          {showFilter ? "Hide Filter" : "Show Filter"}
        </button>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
                    <Link
                      href={item.url}
                      className={`link ${
                        item.url === category.url && "text-primary"
                      }`}
                    >
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
                  <Link href={`/products/${params.category}`} className="link">
                    Relevance
                  </Link>
                </li>
                <li>
                  <Link href={`/products/${params.category}`} className="link">
                    Price: Low to High
                  </Link>
                </li>
                <li>
                  <Link href={`/products/${params.category}`} className="link">
                    Price: High to Low
                  </Link>
                </li>
                <li>
                  <Link href={`/products/${params.category}`} className="link">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <div
              className={`grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-8 transition-all duration-300 ease-in-out`}
            >
              {filteredProducts.map((item) => (
                <ProductCardItem key={Math.random()} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center text-center text3">
              No products found
            </div>
          )}
        </motion.div>
        {/* <EditorsBestChoice />
        <RecentlyViewed /> */}
      </div>
      <BrandLogos />
    </>
  );
};

export default page;
