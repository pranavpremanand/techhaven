const SkeletonLoading = ({
  width = "100%",
  height = "1rem",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-md ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default SkeletonLoading;
