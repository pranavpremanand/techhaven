"use client";

import { deleteProductById } from "@/utils/adminApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export const ProductDeleteConfirmation = ({ productId, visible, onHide }) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const onConfirm = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteProductById(productId);

      if (res.data.success) {
        onHide();
        toast.success(res.data.message);
        queryClient.invalidateQueries(["products"]);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return createPortal(
    <div
      className={`${
        visible ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-6`}
    >
      {isDeleting ? (
        <CgSpinner className="spin h-12 w-12" />
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-2 border border-gray-700 p-6">
          <h2 className="text-lg font-bold text-gray-100 mb-4">
            Confirm Deletion
          </h2>
          <p className="text-gray-300 mb-6">
            Once deleted, you will not be able to recover this product.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              disabled={isDeleting}
              onClick={onHide}
              className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isDeleting}
              onClick={onConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};
