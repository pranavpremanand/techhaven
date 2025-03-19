"use client";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaAddressCard, FaBoxOpen } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdDashboard, MdOutlinePassword } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { PiCaretRight } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { logout } from "@/store/features/userSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/useAuth";

const dashboardOptions = [
  {
    id: 1,
    label: "Profile",
    icon: <MdDashboard size={20} />,
    path: "/profile",
  },
  {
    id: 2,
    label: "Order History",
    icon: <FaBoxOpen size={20} />,
    path: "/profile/orders",
  },
  {
    id: 3,
    label: "Saved Items",
    icon: <BsBookmarkHeartFill size={20} />,
    path: "/profile/#",
    // path: "/profile/wishlist",
  },
  {
    id: 4,
    label: "Manage Addresses",
    icon: <FaAddressCard size={20} />,
    path: "/profile/manage-addresses",
  },
  {
    id: 5,
    label: "Change Password",
    icon: <MdOutlinePassword size={20} />,
    path: "/profile/change-password",
  },
];

const layout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout()); // Clear Redux state
    Cookies.remove("token"); // Clear cookies
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <div className="space-y-8 header-height">
      <div className="bg-white text-[#5F6C72] py-4 sm:py-5">
        <div className="wrapper flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <IoHomeOutline size={17} /> <span>Home</span>
          </div>
          <PiCaretRight size={17} className="hidden sm:block" />
          <span>User Account</span>
          <PiCaretRight size={17} />
          <span className="text-[#2DA5F3]">
            {
              // pathname.startsWith("/profile/orders/") &&
              // pathname !== "/profile/orders"
              //   ? "Order Details"
              //   :
              dashboardOptions.find((item) => item.path === pathname).label
            }
          </span>
        </div>
      </div>
      <section className="wrapper grid grid-cols-1 lg:grid-cols-[15rem,auto] gap-7">
        <div className="bg-white text-[#5F6C72] h-fit py-5 rounded-md w-full">
          {dashboardOptions.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`${
                item.path === pathname ? "bg-primary text-white" : ""
              } flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ease-in-out`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={doLogout}
            className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ease-in-out w-full"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        <div id="content">{children}</div>
      </section>
    </div>
  );
};

export default layout;
