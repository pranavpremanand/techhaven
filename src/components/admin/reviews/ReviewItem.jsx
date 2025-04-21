import { formatCreatedAt } from "@/utils/helper";
import { FaEdit, FaTrash } from "react-icons/fa";

const ReviewItem = ({ review, handleEdit, renderStars, confirmDelete }) => {
  return (
    <li className="p-4 hover:bg-gray-750 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center">
            {renderStars({
              rating: review.rating,
              size: "text-base sm:text-lg",
              disableHoverEffect: true,
            })}
          </div>
          <div className="sm:hidden mt-1 text-xs text-gray-400">
            {formatCreatedAt(review.createdAt)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm sm:text-base font-medium text-gray-100 truncate">
              {review.fullName}
            </h3>
            <p className="hidden sm:block text-sm text-gray-400">
              {formatCreatedAt(review.createdAt)}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-300 whitespace-pre-wrap break-words">
            {review.comment}
          </p>
        </div>
        <div className="flex sm:flex-col gap-2 sm:gap-1 justify-end sm:justify-start">
          <button
            onClick={() => handleEdit(review)}
            className="text-gray-400 hover:text-blue-400 transition-colors p-1"
            title="Edit review"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => confirmDelete(review._id)}
            className="text-gray-400 hover:text-red-400 transition-colors p-1"
            title="Delete review"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
