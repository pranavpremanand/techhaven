// src/app/(root)/profile/change-password/page.jsx
"use client"; // This is a client component

import { useFormState } from "react-dom";
import { handleSubmit } from "@/actions/auth";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Page() {
  const [state, formAction] = useFormState(handleSubmit, null);

  return (
    <div className="w-full p-6">
      <form action={formAction} className="space-y-4 text-black">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your email"
          />
          {state?.errors?.fieldErrors?.email && (
            <small className="text-red-600">
              {state.errors.fieldErrors.email}
            </small>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-sm shadow-sm outline-none"
            placeholder="Enter your password"
          />
          {state?.errors?.fieldErrors?.password && (
            <small className="text-red-600">
              {state.errors.fieldErrors.password}
            </small>
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
          >
            SIGN IN <IoIosArrowRoundForward size={20} />
          </button>
        </div>
      </form>
      {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Login with Google
            </button>
          </div>
        </div> */}
      {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-primary">
            Sign Up
          </a>
        </p>
      </div> */}
    </div>
  );
}