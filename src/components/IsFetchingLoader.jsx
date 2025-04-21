import { CgSpinner } from "react-icons/cg";

const IsFetchingLoader = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-black">
      <CgSpinner className="spin h-12 w-12 text-white" />
    </div>
  );
};

export default IsFetchingLoader;
