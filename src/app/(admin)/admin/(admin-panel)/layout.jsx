"use client";

import { useState } from "react";
import { FiHome, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import Image from "next/image";
import { RxCaretDown } from "react-icons/rx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiLogOutCircle } from "react-icons/bi";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems = [
    { icon: <FiHome size={20} />, text: "Dashboard", href: "/admin" },
    {
      icon: <BsBoxSeam size={20} />,
      text: "Products",
      href: "/admin/products",
    },
    {
      icon: <FiShoppingBag size={20} />,
      text: "Orders",
      href: "/admin/orders",
    },
  ];

  const doLogout = () => {
    localStorage.clear();
    router.push("/admin/signin");
  };
  return (
    <div className="bg-black flex h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed bg-black inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 shadow-lg`}
      >
        <div className="flex items-center justify-between p-4">
          <Image
            src="/logo.png"
            width={150}
            height={50}
            className="mx-auto"
            alt="Logo"
          />
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                href={item.href}
                active={item.href === pathname}
                closeSidebar={() => setSidebarOpen(false)}
              />
            ))}
            <li>
              <button
                onClick={doLogout}
                className="flex items-center transition-all duration-200 space-x-3 p-3 rounded-lg text-white hover:bg-primary w-full"
              >
                <span className="text-white">
                  <BiLogOutCircle size={20} />
                </span>

                <span className="font-light uppercase text-sm tracking-wider">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b">
          <header className="bg-black shadow-sm z-10 w-full">
            <div className="flex items-center justify-between px-4 py-5">
              <button
                className="lg:hidden text-white hover:text-primary"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={24} />
              </button>
              <div className="flex items-center justify-end w-full space-x-4">
                <div className="relative">
                  <button className="peer w-fit border rounded-md px-4 py-1 flex items-center justify-center text-white uppercase text-sm">
                    Admin <RxCaretDown size={20} />
                  </button>
                  <div className="z-[50] peer-hover:visible invisible hover:visible transition-all duration-200 absolute top-10 -left-2/3 bg-[#111111] border border-gray-500 grid grid-cols-1 min-w-[11rem] mr-3 text-sm rounded">
                    {/* <Link
                      href="/admin/settings"
                      className="py-2 px-3 hover:bg-[#2f2f2f] text-start"
                    >
                      Change Password
                    </Link> */}
                    <button
                      onClick={doLogout}
                      className="py-2 px-3 hover:bg-[#2f2f2f] text-start"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:!pl-[17rem] !pb-[3rem]">
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, href, active = false, closeSidebar }) => {
  return (
    <li>
      <Link
        href={href}
        onClick={closeSidebar}
        className={`flex items-center transition-all duration-200 space-x-3 p-3 rounded-lg ${
          active ? "bg-primary" : "text-white hover:bg-primary"
        }`}
      >
        <span className="text-white">{icon}</span>
        <span className="font-light uppercase text-sm tracking-wider">
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Layout;
