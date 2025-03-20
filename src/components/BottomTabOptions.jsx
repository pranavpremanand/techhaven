"use client";
import { FaHome } from "react-icons/fa";
import { FaOpencart, FaUser } from "react-icons/fa6";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/userSlice";

const options = [
  {
    id: 1,
    label: "Home",
    icon: <FaHome size={20} />,
    path: "/",
  },
  {
    id: 2,
    label: "Profile",
    icon: <FaUser size={20} />,
    path: "/profile",
  },
  {
    id: 3,
    label: "Cart",
    icon: <FaOpencart size={20} />,
    path: "/cart",
  },
  // {
  //   id: 4,
  //   label: "Saved",
  //   icon: <BsBookmarkHeartFill size={20} />,
  //   // path: "/profile/",
  //   path: "/profile/wishlist",
  // },
];

const BottomTabOptions = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const doLogout = () => {
      dispatch(logout()); // Clear Redux state
      Cookies.remove("token"); // Clear cookies
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/signin");
    };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white h-fit z-[9999] lg:hidden block">
      <div className="grid grid-cols-4">
        {options.map((option) => (
          <Link
            href={option.path}
            key={option.id}
            className={`${
              pathname === option.path ? "bg-primary text-white" : "text-black"
            } flex flex-col items-center justify-center gap-1 p-2`}
          >
            {option.icon}
            <p className="text-xs">{option.label}</p>
          </Link>
        ))}
        <button
          onClick={doLogout}
          className={`text-black flex flex-col items-center justify-center gap-1 p-2`}
        >
          <FiLogOut />
          <p className="text-xs">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default BottomTabOptions;
