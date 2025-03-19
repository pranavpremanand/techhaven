"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { changePassword } from "@/utils/api";
import { changePasswordSchema } from "@/utils/schemas";
import toast from "react-hot-toast";

const page = () => {
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data);
      if (res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success("Password changed successfully");
        reset();
      }
    } catch (err) {
      toast.error("Failed to change password");
    }
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
          {...register("oldPassword")}
          className="p-2 rounded-md outline-none border-2 w-full bg-white text-black"
        />
        {errors.oldPassword && (
          <small className="text-red-600">{errors.oldPassword.message}</small>
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
          <div
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="focus:outline-none cursor-pointer"
          >
            {showNewPassword ? <IoMdEyeOff size={23} /> : <IoMdEye size={23} />}
          </div>
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
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="focus:outline-none cursor-pointer"
          >
            {showConfirmPassword ? (
              <IoMdEyeOff size={23} />
            ) : (
              <IoMdEye size={23} />
            )}
          </div>
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
