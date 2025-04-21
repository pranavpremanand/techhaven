"use client";

import { productImages } from "@/content/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";
import { ProductDeleteConfirmation } from "./ProductDeleteConfirmation";

const ProductGridItem = ({ item }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg space-y-4">
      <div className="flex gap-3 relative">
        <Image
          src={item.imageUrls[0]}
          width={100}
          height={100}
          alt={item.productName}
          className="object-cover h-full rounded-lg bg-primary border aspect-square"
        />
        <div className="space-y-1 pr-7">
          <h6 className="text-base font-medium line-clamp-2">{item.productName}</h6>
          <p className="text-sm text-gray-500">{item.category || ""}</p>
          <p className="text-sm">₹ {item.price}</p>
        </div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="absolute top-0 right-0 w-fit bg-gray-300 hover:bg-gray-200 transition-all duration-200 text-black/80 p-1 rounded"
        >
          <RxDotsHorizontal size={22} />
        </button>
        {showOptions && (
          <div className="absolute w-[8rem] border text-sm top-8 right-0 bg-white rounded shadow-md flex flex-col z-10">
            <Link
              href={`/admin/reviews/${item._id}`}
              className="hover:bg-black/20 py-2 px-5 text-start"
            >
              Reviews
            </Link>
            <Link
              href={`/admin/products/edit/${item._id}`}
              className="hover:bg-black/20 py-2 px-5 text-start"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="hover:bg-black/20 py-2 px-5 text-start"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h6 className="font-medium">Description</h6>
        <div
          className="text-gray-500 text-sm"
          dangerouslySetInnerHTML={{
            __html:
              item.description.replace(/<[^>]*>"?/gm, "").substring(0, 150) +
              "...",
          }}
        />
      </div>
      <div className="p-3 rounded-lg border text-sm text-black/80 space-y-3">
        <div className="flex justify-between">
          <span>Available in Stock</span>
          <div
            className={`${
              item.isOutOfStock ? "bg-red-500" : "bg-primary"
            } border w-5 h-5 flex justify-center items-center rounded-sm`}
          >
            {item.isOutOfStock ? (
              <FaX className="text-white" size={12} />
            ) : (
              <FaCheck className="text-white" size={12} />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <span>Offer Percentage</span>
          <span>{item.offerPercentage}%</span>
        </div>
      </div>
      <ProductDeleteConfirmation
        productId={item._id}
        onHide={() => setShowDeleteConfirmation(false)}
        visible={showDeleteConfirmation}
      />
    </div>
  );
};

export default ProductGridItem;
