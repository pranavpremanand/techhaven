"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserProfile, updateUserProfile } from "@/utils/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { profileSchema } from "@/utils/schemas";

const Page = () => {
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const res = await getUserProfile();
      if (res.data) {
        // Set default values for the form
        setValue("fullName", res.data.fullName);
        setValue("email", res.data.email);
      }
    } catch (err) {
      toast.error("Failed to fetch profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await updateUserProfile(data);
      if (res.data) {
        toast.success("Profile updated successfully");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setEditable(false); // Disable edit mode after submission
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2 max-w-lg">
        <h5 className="font-medium text-[1.05rem]">Hello,</h5>
        <p>
          From your profile, you can easily check & view your{" "}
          <Link href="/orders" className="text-primary font-semibold">
            Recent Orders
          </Link>
          , and change your{" "}
          <Link href="/change-password" className="text-primary font-semibold">
            Password
          </Link>{" "}
          and{" "}
          <Link href="/manage-addresses" className="text-primary font-semibold">
            Manage Addresses.
          </Link>
        </p>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable || isLoading}
          />
          {errors.fullName && (
            <small className="text-red-600">{errors.fullName.message}</small>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            {...register("email")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable || isLoading}
          />
          {errors.email && (
            <small className="text-red-600">{errors.email.message}</small>
          )}
        </div>

        {/* Save Button (Inside the Form) */}
        {editable && (
          <div className="mt-4">
            <button
              type="submit"
              className="primary-btn w-[10rem]"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        )}
      </form>
      {/* Edit Profile Button (Outside the Form) */}
      {!editable && (
        <button
          type="button"
          onClick={() => setEditable(true)}
          className="cursor-pointer primary-btn w-[10rem]"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Edit Profile"}
        </button>
      )}
    </div>
  );
};

export default Page;
