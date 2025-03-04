import { companyDetails } from "@/content/constant";
import Link from "next/link";
import React from "react";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import Image from "next/image";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { BiCaretDown } from "react-icons/bi";
import { BsFire } from "react-icons/bs";

const Header = () => {
  return (
    <div className="fixed inset-0 w-full h-fit z-[999] bg-black">
      <div className="bg-primary py-3">
        <div className="wrapper flex justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <FaPhone size={15} />
              <Link href={`tel:${companyDetails.phone}`}>
                {companyDetails.phone}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <MdMail size={20} />
              <Link href={`mailto:${companyDetails.email}`}>
                {companyDetails.email}
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-2">
              <FaLocationDot size={15} />
              <span>{companyDetails.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper py-4 flex items-center gap-8 justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            width={180}
            height={25}
            alt="logo"
            className="object-contain min-w-[7rem] w-[7rem] lg:min-w-[9rem] lg:w-[9rem]"
          />
        </Link>

        <div className="flex w-full items-center justify-end gap-5">
          <div className="p-3 w-full max-w-lg bg-white text-black rounded-lg overflow-hidden hidden lg:flex items-center gap-2">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search here..."
            />
            <FaSearch size={20} />
          </div>
          <Link href="/">
            <FaShoppingCart size={25} />
          </Link>
          <Link
            href="/"
            className="lg:!flex !hidden min-w-[10rem] primary-btn uppercase"
          >
            <IoPersonCircle size={30} />
            My Account
          </Link>
          <Link href="/" className="lg:hidden">
            <IoPersonCircle size={30} />
          </Link>
        </div>
      </div>
      <div className="wrapper py-4 hidden lg:flex gap-10 xl:gap-14">
        <div className="relative group">
          <button className="flex items-center gap-2 peer">
            All Categories
            <BiCaretDown
              size={20}
              className="group-hover:-rotate-180 transition-all duration-300"
            />
          </button>
          <div className="bg-[#111111] w-[15rem] absolute top-[2.5rem] left-0 z-10 invisible peer-hover:visible hover:visible flex flex-col transition-all duration-300 rounded-lg overflow-hidden group">
            {categories.map((category) => (
              <Link
                href={category.url}
                key={category.name}
                className="p-3 hover:text-primary hover:bg-[#222222]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        {categories.map((category) => (
          <Link href={category.url} key={category.name} className="link">
            {category.name}
          </Link>
        ))}
        <Link href="/" className="text-red-600 link flex items-center gap-1">
          <BsFire size={15} />
          Flash Sale
        </Link>
      </div>
    </div>
  );
};

export default Header;

const categories = [
  {
    name: "Accessories",
    url: "#",
  },
  {
    name: "Smartphones",
    url: "#",
  },
  {
    name: "Laptops",
    url: "#",
  },
  {
    name: "Gaming Equipments",
    url: "#",
  },
  {
    name: "TV & Monitors",
    url: "#",
  },
];
