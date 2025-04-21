"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../LoadingSpinner";

export const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      router.push("/admin/signin");
    } else {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) return <LoadingSpinner />;

  return isAuthenticated ? children : null;
};

export const PublicRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      router.push("/admin");
    }
  }, [isChecking, isAuthenticated, router]);

  if (isChecking) return <LoadingSpinner />;

  return !isAuthenticated ? children : null;
};
