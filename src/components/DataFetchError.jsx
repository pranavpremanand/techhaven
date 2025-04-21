import { IoIosCloseCircle } from "react-icons/io";

const DataFetchError = ({ error }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <IoIosCloseCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            Failed to load dashboard data: {error.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataFetchError;
