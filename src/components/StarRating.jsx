import { FaStar, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating, size }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = totalStars - filledStars;

  return (
    <div className="flex items-center gap-[.1rem]">
      {/* Render filled stars */}
      {[...Array(filledStars)].map((_, index) => (
        <FaStar size={size} key={`filled-${index}`} />
      ))}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar size={size} key={`empty-${index}`} />
      ))}
    </div>
  );
};

export default RatingStars;
