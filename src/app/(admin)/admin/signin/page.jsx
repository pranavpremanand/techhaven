"use client";

import { PublicRoute } from "@/components/admin/AdminRouteWrappers";
import { doAdminLogin } from "@/utils/adminApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiSpinnerGapLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { z } from "zod";

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
      const res = await doAdminLogin(data);
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        // Cookies.set("token", res.data.token, { expires: 7 });
        router.push("/admin");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err)
      if (err?.response?.data) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <PublicRoute>
      <div className="wrapper flex flex-col gap-3 items-center justify-center min-h-screen">
        <div className="max-w-md bg-white rounded-lg w-full">
          <div className="flex items-center">
            <div className="w-full p-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 text-black"
              >
                <h1 className="text-xl font-medium tracking-wider text-center">
                  Admin
                </h1>
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <small className="text-red-600">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <small className="text-red-600">
                      {errors.password.message}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full primary-btn !rounded-[.125rem]"
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
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default page;
