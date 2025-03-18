"use client"
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("token");

    if (!isAuthenticated && ["/cart", "/profile", "/checkout"].includes(pathname)) {
      router.push("/signin");
    }
};