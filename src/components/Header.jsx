"use client";

import { companyDetails } from "@/content/constant";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import Image from "next/image";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { BiCaretDown } from "react-icons/bi";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    setIsClient(true); // Set to true after hydration
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-fit z-[999] bg-black lg:fixed inset-0">
      {/* Top Contact Bar (Visible on lg and above) */}
      <div className={`${isSticky ? "hidden" : "block"}`}>
        <div className="hidden lg:flex bg-primary py-3">
          <div className="wrapper w-full flex justify-between gap-8">
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
            {/* <div className="hidden lg:flex items-center gap-5">
              <div className="flex items-center gap-2">
                <FaLocationDot size={15} />
                <span>{companyDetails.location}</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="wrapper py-4 flex items-center gap-8 justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            width={180}
            height={25}
            alt="logo"
            className="object-contain min-w-[7rem] w-[7rem] lg:min-w-[9rem] lg:w-[9rem]"
          />
        </Link>

        {/* Search, Cart, and Account (Visible on lg and above) */}
        <div className="flex w-full items-center justify-end gap-8">
          {/* Search Input (Hidden on lg and below) */}
          <div className="p-3 w-full max-w-lg bg-white text-black rounded-lg overflow-hidden hidden lg:flex items-center gap-2">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search here..."
            />
            <button type="submit">
              <FaSearch size={20} />
            </button>
          </div>

          {/* Cart Icon */}
          <Link href="/cart" className="link">
            <FaShoppingCart size={25} />
          </Link>

          {/* Account (Visible on lg and above) */}
          {isClient && // Only render on the client side
            (isLoggedIn ? (
              <Link
                href="/profile"
                className="lg:!flex !hidden min-w-[10rem] primary-btn uppercase !h-fit"
              >
                <IoPersonCircle size={22} />
                My Account
              </Link>
            ) : (
              <Link
                href="/signin"
                className="lg:!flex !hidden min-w-[10rem] primary-btn uppercase !h-fit"
              >
                <IoPersonCircle size={22} />
                Sign In
              </Link>
            ))}

          {/* Account Icon (Visible on lg and below) */}
          {isClient && // Only render on the client side
            (isLoggedIn ? (
              <Link href="/profile" className="lg:hidden">
                <IoPersonCircle size={30} />
              </Link>
            ) : (
              <Link href="/signin" className="lg:hidden">
                <IoPersonCircle size={30} />
              </Link>
            ))}
        </div>
      </div>

      {/* Categories Section (Visible on lg and above) */}
      <div className="wrapper lg:py-4 hidden lg:flex gap-10 xl:gap-14">
        <div className="relative group hidden lg:block">
          <button className="flex items-center gap-2 peer">
            All Categories
            <BiCaretDown
              size={20}
              className="group-hover:-rotate-180 transition-all duration-300"
            />
          </button>
          <div className="bg-[#111111] w-[15rem] absolute top-[2.3rem] left-0 z-10 invisible peer-hover:visible hover:visible flex flex-col transition-all duration-300 rounded-lg overflow-hidden group scale-x-0 peer-hover:scale-x-[1] hover:scale-x-[1]">
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
      </div>

      {/* Sticky Search Input (Visible on lg and below) */}
      <div
        className={`lg:hidden w-full bg-black transition-all duration-300 ${
          isSticky ? "fixed top-0 z-[9999] pt-2" : "relative"
        }`}
      >
        <div className="wrapper pb-2">
          <div className="p-3 w-full bg-white text-black rounded-full overflow-hidden flex items-center gap-2">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search here..."
            />
            <button type="submit">
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

export const categories = [
  {
    name: "Electronics & Gadgets",
    url: "/products/electronics-and-gadgets",
  },
  {
    name: "Smartphones",
    url: "/products/smartphones",
  },
  {
    name: "Laptops",
    url: "/products/laptops",
  },
  {
    name: "Gaming Equipments",
    url: "/products/gaming-equipments",
  },
  {
    name: "TV & Monitors",
    url: "/products/tv-and-monitors",
  },
];
