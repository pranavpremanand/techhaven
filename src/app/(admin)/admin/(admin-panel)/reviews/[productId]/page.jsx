"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaStar, FaRegStar } from "react-icons/fa";
import ReviewModal from "@/components/admin/reviews/ReviewModal";
import { PrivateRoute } from "@/components/admin/AdminRouteWrappers";
import {
  addReview,
  deleteReviewById,
  getReviews,
  updateReview,
} from "@/utils/adminApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IsFetchingLoader from "@/components/IsFetchingLoader";
import DataFetchError from "@/components/DataFetchError";
import toast from "react-hot-toast";
import ReviewItem from "@/components/admin/reviews/ReviewItem";

export default function ProductReviewsPage() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await getReviews(productId);
      return res.data.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      rating: 0,
      comment: "",
    },
  });

  const currentRating = watch("rating");

  const onSubmit = async (values) => {
    try {
      if (isEditMode) {
        const res = await updateReview(values, currentReviewId);
        if (res.data.success) {
          queryClient.invalidateQueries(["reviews"]);
          toast.success("Review updated successfully!");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await addReview({ ...values, productId });
        if (res.data.success) {
          queryClient.invalidateQueries(["reviews"]);
          toast.success("Review added successfully!");
        } else {
          toast.error(res.data.message);
        }
      }
      resetForm();
    } catch (error) {
      toast.error("An error occurred while submitting the review.");
    }
  };

  const handleEdit = (review) => {
    setValue("fullName", review.fullName);
    setValue("rating", review.rating);
    setValue("comment", review.comment);
    setCurrentReviewId(review._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const confirmDelete = (id) => {
    setReviewToDelete(id);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteReviewById(reviewToDelete);
      if (res.data.success) {
        queryClient.invalidateQueries(["reviews"]);
        toast.success("Review deleted successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the review.");
    } finally {
      setReviewToDelete(null);
    }
  };

  const cancelDelete = () => {
    setReviewToDelete(null);
  };

  const resetForm = () => {
    reset();
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentReviewId(null);
    setHoverRating(0);
  };

  const renderStars = ({ rating, size = "text-lg", disableHoverEffect }) => {
    return [...Array(5)].map((_, i) => {
      const ratingValue = i + 1;
      return (
        <span key={i} className={size}>
          {ratingValue <= (disableHoverEffect ? rating : hoverRating) ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-500" />
          )}
        </span>
      );
    });
  };

  if (isLoading) {
    return <IsFetchingLoader />;
  }

  if (isError) {
    return <DataFetchError error={error} />;
  }

  return (
    <PrivateRoute>
      <div className="space-y-6 p-4 min-h-screen text-gray-100">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-gray-400 block">
              Home &gt; {data.product.productName} &gt; Reviews
            </span>
            <h1 className="text-xl md:text-2xl font-semibold mt-3">
              Product Reviews
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/70 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
          >
            <FaStar className="text-white" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Reviews list */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          {data.reviews.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No reviews yet. Be the first to add one!
            </div>
          ) : (
            <ul className="divide-y divide-gray-700">
              {data.reviews.map((review) => (
                <ReviewItem
                  key={review._id}
                  review={review}
                  handleEdit={handleEdit}
                  confirmDelete={confirmDelete}
                  renderStars={renderStars}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Review Modal */}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={resetForm}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          currentRating={currentRating}
          setValue={setValue}
          setHoverRating={setHoverRating}
          hoverRating={hoverRating}
        />

        {/* Delete Confirmation Modal */}
        {reviewToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-2 border border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this review? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
