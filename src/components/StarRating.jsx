import { FaStar, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating, size, className }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = totalStars - filledStars;
  console.log(rating);

  return (
    <div className="flex items-center gap-[.1rem]">
      {/* Render filled stars */}
      {[...Array(filledStars)].map((_, index) => (
        <FaStar size={size} className={className} key={`filled-${index}`} />
      ))}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar size={size} className={className} key={`empty-${index}`} />
      ))}
    </div>
  );
};

export default RatingStars;
