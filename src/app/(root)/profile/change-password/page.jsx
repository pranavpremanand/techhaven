"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// Define the validation schema using Zod
const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        "Password must contain at least one letter and one number, and no special characters"
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach error to confirmPassword field
  });

const page = () => {
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 max-w-lg"
    >
      {/* Current Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Current Password</label>
        <input
          type="password"
          {...register("currentPassword")}
          className="p-2 rounded-md outline-none border-2 w-full bg-white text-black"
        />
        {errors.currentPassword && (
          <small className="text-red-600">
            {errors.currentPassword.message}
          </small>
        )}
      </div>

      {/* New Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">New Password</label>
        <div className="rounded-md border-2 bg-white p-[.55rem] text-black flex items-center justify-between gap-2">
          <input
            type={showNewPassword ? "text" : "password"}
            {...register("newPassword")}
            className="outline-none w-full bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="focus:outline-none"
          >
            {showNewPassword ? <IoMdEyeOff size={23} /> : <IoMdEye size={23} />}
          </button>
        </div>
        {errors.newPassword && (
          <small className="text-red-600">{errors.newPassword.message}</small>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Confirm Password</label>
        <div className="rounded-md border-2 bg-white p-2 text-black flex items-center justify-between gap-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="outline-none w-full bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="focus:outline-none"
          >
            {showConfirmPassword ? (
              <IoMdEyeOff size={23} />
            ) : (
              <IoMdEye size={23} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <small className="text-red-600">
            {errors.confirmPassword.message}
          </small>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button type="submit" className="primary-btn w-[10rem]">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default page;
