"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import pincodes from "indian-pincodes";
import { State } from "country-state-city";
import Link from "next/link";

// Define the validation schema using Zod
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\+?[\d\s\-()]{6,14}\d$/, "Please enter a valid phone number"),
  postalCode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .refine(
      (val) => {
        const details = pincodes.getPincodeDetails(Number(val));
        return !!details; // Ensure pincode is valid
      },
      { message: "Please enter a valid ZIP or postal code" }
    ),
  address: z.string().min(1, "Address is required"),
  landmark: z.string().min(1, "Landmark is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

const Page = () => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN")) || [];
  const [editable, setEditable] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "+91565656565",
      postalCode: "110001",
      address: "123 Street, New Delhi",
      landmark: "Near Metro Station",
      city: "New Delhi",
      state: "Delhi",
    },
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
    setEditable(false); // Disable edit mode after submission
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2 max-w-lg">
        <h5 className="font-medium text-[1.05rem]">Hello User,</h5>
        <p>
          From your profile, you can easily check & view your{" "}
          <Link href="/orders" className="text-blue-400">
            Recent Orders
          </Link>
          , and change your{" "}
          <Link href="/change-password" className="text-blue-400">
            Password
          </Link>{" "}
          and{" "}
          <Link href="/change-password" className="text-blue-400">
            Account Details.
          </Link>
        </p>
      </div>
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
            disabled={!editable}
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
            disabled={!editable}
          />
          {errors.email && (
            <small className="text-red-600">{errors.email.message}</small>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            placeholder="Enter phone number"
            disabled={!editable}
          />
          {errors.phoneNumber && (
            <small className="text-red-600">{errors.phoneNumber.message}</small>
          )}
        </div>

        {/* Pincode */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Pincode</label>
          <input
            type="text"
            {...register("postalCode", {
              onChange: (e) => {
                const pincode = e.target.value;
                if (pincode.length === 6) {
                  const details = pincodes.getPincodeDetails(Number(pincode));
                  if (details) {
                    setValue("city", details.division);
                    setValue("state", details.state);
                    setError("city", null);
                    setError("state", null);
                  }
                }
              },
            })}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            placeholder="6 digit [0-9] pincode"
            maxLength={6}
            disabled={!editable}
          />
          {errors.postalCode && (
            <small className="text-red-600">{errors.postalCode.message}</small>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Address</label>
          <input
            type="text"
            {...register("address")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          />
          {errors.address && (
            <small className="text-red-600">{errors.address.message}</small>
          )}
        </div>

        {/* Landmark */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Landmark</label>
          <input
            type="text"
            {...register("landmark")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          />
          {errors.landmark && (
            <small className="text-red-600">{errors.landmark.message}</small>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">City</label>
          <input
            type="text"
            {...register("city")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          />
          {errors.city && (
            <small className="text-red-600">{errors.city.message}</small>
          )}
        </div>

        {/* State */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">State</label>
          <select
            {...register("state")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <small className="text-red-600">{errors.state.message}</small>
          )}
        </div>

        {/* Edit Address Button */}
        <div className="mt-4">
          {!editable ? (
            <div
              onClick={() => setEditable(true)}
              className="cursor-pointer primary-btn w-[10rem]"
            >
              Edit Address
            </div>
          ) : (
            <button type="submit" className="primary-btn w-[10rem]">
              Save Address
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
