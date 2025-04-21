"use client";

import SliderWithThumbnails from "@/components/productDetails/SliderWithThumbnails";
import RecentlyViewed from "@/components/RecentlyViewed";
import RatingStars from "@/components/StarRating";
import Link from "next/link";
import { FaTruckPickup } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { RiBox3Fill } from "react-icons/ri";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import AddToCartSection from "@/components/productDetails/AddToCartSection";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getSingleProduct } from "@/utils/api";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "@/components/SpinnerContext";
import IsFetchingLoader from "@/components/IsFetchingLoader";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { pageLoader, setPageLoader } = useContext(SpinnerContext);
  const [error, setError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const getProduct = async () => {
    try {
      setPageLoader(true);
      const res = await getSingleProduct(id);
      if (res.data) {
        console.log(res.data.data);
        setProduct(res.data.data.product);
        setReviews(res.data.data.reviews);
        setAvgRating(res.data.data.averageRating);
        setTotalReviews(res.data.data.totalReviews);
      } else {
        setError(true);
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch product");
      setError(true);
    } finally {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  if (pageLoader) {
    return (
      <div className="header-height">
        <IsFetchingLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="header-height bg-black">
        <div className="wrapper section-py min-h-[40vh] flex items-center justify-center">
          <h1 className="text-center text-3xl font-bold text-white">
            Product not found
          </h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="header-height">
        <IsFetchingLoader />
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <div className="header-height">
        <div className="wrapper section-py space-y-6 md:space-y-10 w-full">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <RxCaretRight size={16} className="min-w-5" />
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Products
              </Link>
              <RxCaretRight size={16} className="min-w-5" />
              <span className="text-primary line-clamp-2">{product.productName}</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr),minmax(300px,1fr)] gap-12 w-full">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-700"
            >
              <SliderWithThumbnails images={product.imageUrls} />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full space-y-6"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {product.category}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {product.productName}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <RatingStars
                      rating={avgRating}
                      size={18}
                      className="text-yellow-400"
                    />
                    <span className="text-gray-400 text-sm">
                      ({totalReviews} reviews)
                    </span>
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    {product.stockStatus}
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold text-white">
                    ₹{product.totalPrice || product.price}
                  </h3>
                  {product.totalPrice &&
                    product.totalPrice !== product.price && (
                      <>
                        <del className="text-gray-500 text-lg">
                          ₹{product.price}
                        </del>
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 text-sm font-medium rounded">
                          {Math.round(
                            (1 - product.totalPrice / product.price) * 100
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                </div>
                <p className="text-gray-400 text-sm">Inclusive of all taxes</p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <FaTruckPickup className="text-primary text-xl" />
                  <div>
                    <p className="font-medium text-white">Free Delivery</p>
                    <p className="text-xs text-gray-400">6-8 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <RiBox3Fill className="text-primary text-xl" />
                  <div>
                    <p className="font-medium text-white">Secure Packaging</p>
                    <p className="text-xs text-gray-400">Guaranteed</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart Section */}
              <AddToCartSection product={product} />
            </motion.div>
          </div>

          {/* Description Section */}
          {product.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-3">
                Product Details
              </h2>
              <div
                className="prose max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </motion.div>
          )}

          {reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-3">
                Customer Reviews ({totalReviews})
              </h2>

              <div className="space-y-8">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-700 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-white">
                          {review.userId?.fullName || review.fullName}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <RatingStars
                        rating={review.rating}
                        size={16}
                        className="text-yellow-400"
                      />
                    </div>

                    <p className="mt-3 text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recently Viewed */}
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default Page;
