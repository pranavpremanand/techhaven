"use client";
import { usePathname, useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated =
    typeof window !== "undefined" && localStorage.getItem("token");

  if (
    !isAuthenticated &&
    ["/cart", "/profile", "/checkout"].includes(pathname)
  ) {
    typeof window !== "undefined" && router.push("/signin");
  }
};
