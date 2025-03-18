import { companyDetails } from "@/content/constant";
import { createUrlParam } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { PiPhone } from "react-icons/pi";
import { categories } from "./Header";

const Footer = () => {
  return (
    <div className="pt-7 md:pt-14 text-sm">
      <div className="wrapper grid md:grid-cols-[1fr,auto,auto] gap-10 md:gap-20">
        <div className="max-w-[20rem]">
          <div className="space-y-1 flex flex-col md:items-center">
            <Image
              src="/logo.png"
              width={180}
              height={25}
              alt="logo"
              className="object-contain w-[15rem]"
            />
            <p className="text-center">
              We aim to make your shopping experience seamless, enjoyable, and,
              above all, exciting.
            </p>
          </div>
        </div>
        <div className="space-y-3 flex flex-col">
          <h4 className="text-lg font-semibold">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products/electronics-and-gadgets"
                className="link"
              >
                Products
              </Link>
            </li>
            {/* <li>
              <Link href="/contact-us" className="link">
                Contact Us
              </Link>
            </li> */}
          </ul>
        </div>
        {/* <div className="space-y-3 flex flex-col items-center">
          <h4 className="text-lg font-semibold">Information</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="link">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/" className="link">
                Payment Methods
              </Link>
            </li>
            <li>
              <Link href="/" className="link">
                Return & Refund
              </Link>
            </li>
            <li>
              <Link href="/" className="link">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="space-y-3 flex flex-col">
          <h4 className="text-lg font-semibold">Contact</h4>
          <ul className="space-y-3">
            <li>
              <Link
                href={`tel:${companyDetails.phone}`}
                className="link flex items-center gap-1"
              >
                <PiPhone size={25} />
                {companyDetails.phone}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${companyDetails.email}`}
                className="link flex items-center gap-2"
              >
                <IoMailOutline size={22} />
                {companyDetails.email}
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-5 pt-5">
            <Link
              href="/"
              className="group w-8 h-8 flex justify-center items-center bg-primary rounded-md hover:bg-white transition-all duration-200"
            >
              <AiFillInstagram size={20} className="group-hover:text-primary" />
            </Link>
            <Link
              href="/"
              className="group w-8 h-8 flex justify-center items-center bg-primary rounded-md hover:bg-white transition-all duration-200"
            >
              <FaXTwitter size={20} className="group-hover:text-primary" />
            </Link>
            <Link
              href="/"
              className="group w-8 h-8 flex justify-center items-center bg-primary rounded-md hover:bg-white transition-all duration-200"
            >
              <FaFacebook size={20} className="group-hover:text-primary" />
            </Link>
            <Link
              href="/"
              className="group w-8 h-8 flex justify-center items-center bg-primary rounded-md hover:bg-white transition-all duration-200"
            >
              <FaLinkedinIn size={20} className="group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary pt-3 mt-10 pb-[5rem] lg:pb-3">
        <div className="wrapper text-center">
          <p>
            Copyright © {new Date().getFullYear()} Techhaven. All Right Reseved
          </p>
          {/* <div className="h-[1px] w-full max-w-[20rem] bg-white rounded" /> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
