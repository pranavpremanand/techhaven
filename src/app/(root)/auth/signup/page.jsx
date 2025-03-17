import { IoIosArrowRoundForward } from "react-icons/io";

const page = () => {
  return (
    <div className="w-full p-6">
      <form className="space-y-4 text-black">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Repeat your password"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full primary-btn !rounded-[.125rem]"
          >
            SIGN UP <IoIosArrowRoundForward size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
