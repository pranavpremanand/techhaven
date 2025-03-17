"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isSignIn = pathname.includes("/auth/signin");
  return (
    <div className="wrapper header-height flex items-center justify-center min-h-[70vh] py-[3rem]">
      <div className="max-w-md bg-white rounded-lg w-full">
        <div className="grid grid-cols-2 text-black">
          <Link
            href="/auth/signin"
            className={`text-xl font-medium p-4 text-center border-b-2 ${
              isSignIn ? "border-[#FA8232]" : "border-gray-300 text-gray-500"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className={`text-xl font-medium p-4 text-center border-b-2 ${
              !isSignIn ? "border-[#FA8232]" : "border-gray-300 text-gray-500"
            }`}
          >
            Sign Up
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
