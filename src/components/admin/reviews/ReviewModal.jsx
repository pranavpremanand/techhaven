"use client";

import { FaStar, FaRegStar, FaTimes } from "react-icons/fa";

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
  isEditMode,
  currentRating,
  setValue,
  setHoverRating,
  hoverRating,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-2 border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg md:text-xl font-bold text-gray-100">
            {isEditMode ? "Edit Review" : "Add New Review"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Full name must be less than 50 characters",
                },
              })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-primary focus:border-primary disabled:opacity-50"
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Rating
            </label>
            <div className="flex items-center text-xl md:text-2xl space-x-1">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    className="focus:outline-none hover:scale-110 transform transition-transform disabled:opacity-50"
                    onClick={() => setValue("rating", ratingValue)}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isSubmitting}
                  >
                    {ratingValue <= (hoverRating || currentRating) ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-gray-500" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-400">
                {errors.rating.message}
              </p>
            )}
            <input
              type="hidden"
              {...register("rating", {
                required: "Please select a rating",
                min: { value: 1, message: "Minimum rating is 1 star" },
                max: { value: 5, message: "Maximum rating is 5 stars" },
              })}
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Review Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 5,
                  message: "Comment must be at least 5 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Comment must be less than 500 characters",
                },
              })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-primary focus:border-primary disabled:opacity-50"
              disabled={isSubmitting}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-400">
                {errors.comment.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : isEditMode
                ? "Update Review"
                : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
