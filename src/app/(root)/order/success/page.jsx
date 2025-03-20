import Link from "next/link";
import React from "react";
import { HiMiniCheck } from "react-icons/hi2";
import { HiArrowSmRight } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const page = () => {
  return (
    <div className="wrapper header-height min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center p-2 bg-[#1c3320] w-fit rounded-full mx-auto border-2 border-[#8AFFA2]">
          <HiMiniCheck className="w-12 h-12 text-[#8AFFA2]" />
        </div>
        <h2 className="text-2xl font-medium mt-4">
          Your order is successfully placed. We will contact you soon.
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 items-center gap-4 sm:gap-7">
          <Link href="/profile" className="primary-btn">
            <MdDashboard className="w-6 h-6" /> GO TO PROFILE
          </Link>
          <Link href="/profile/orders" className="btn bg-white text-primary">
            VIEW ORDERS <HiArrowSmRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
