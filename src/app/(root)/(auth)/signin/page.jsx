"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { doSignin } from "@/utils/api";
import { PiSpinnerGapLight } from "react-icons/pi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "@/store/features/userSlice";
import Cookies from "js-cookie";

// Define the strict validation schema using Zod
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
      "Password must contain at least one letter and one number, and no special characters"
    ),
});

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await doSignin(data);
      if (res.data.user) {
        dispatch(setLoginStatus(true));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        Cookies.set("token", res.data.token, { expires: 7 });
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      if (err?.response?.data) {
        toast.error(err?.response?.data?.error);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="w-full p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <small className="text-red-600">{errors.email.message}</small>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your password"
          />
          {errors.password && (
            <small className="text-red-600">{errors.password.message}</small>
          )}
          {/* <div className="text-right mt-2">
            <a href="#" className="text-sm text-blue-600 hover:text-primary">
              Forget Password?
            </a>
          </div> */}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full primary-btn !rounded-[.125rem]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <PiSpinnerGapLight size={20} className="spin" />
            ) : (
              <>
                SIGN IN <IoIosArrowRoundForward size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
