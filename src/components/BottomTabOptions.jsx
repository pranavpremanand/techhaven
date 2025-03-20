"use client";
import { FaHome } from "react-icons/fa";
import { FaOpencart, FaUser } from "react-icons/fa6";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  {
    id: 4,
    label: "Saved",
    icon: <BsBookmarkHeartFill size={20} />,
    // path: "/profile/",
    path: "/profile/wishlist",
  },
];

const BottomTabOptions = () => {
  const pathname = usePathname();
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
      </div>
    </div>
  );
};

export default BottomTabOptions;
