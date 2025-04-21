"use client";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaOpencart, FaUser } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/userSlice";

const BottomTabOptions = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showUI, setShowUI] = useState(false);

  // Options defined as constant inside component
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
  ];

  useEffect(() => {
    // This effect only runs on the client side after hydration
    setShowUI(true);
  }, []);

  const doLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    router.replace("/signin");
  };

  // Don't render anything during SSR
  if (!showUI) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white h-fit z-[9999] lg:hidden block">
        <div className="grid grid-cols-4 h-[60px]" aria-hidden="true"></div>
      </div>
    );
  }

  // Get token safely after we know we're on the client
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

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
        {token ? (
          <button
            onClick={doLogout}
            className="text-black flex flex-col items-center justify-center gap-1 p-2"
          >
            <FiLogOut size={20} />
            <p className="text-xs">Logout</p>
          </button>
        ) : (
          <Link
            href="/signin"
            className="text-black flex flex-col items-center justify-center gap-1 p-2"
          >
            <FiLogOut size={20} />
            <p className="text-xs">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomTabOptions;
