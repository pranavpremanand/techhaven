"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pincodes from "indian-pincodes";
import { State } from "country-state-city";
import { addressSchema } from "@/utils/schemas";
import { useState } from "react";

const AddressForm = ({ onSubmit, defaultValues, onCancel }) => {
  const [states, setStates] = useState(State.getStatesOfCountry("IN")) || [];
  const [editable, setEditable] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          />
          {errors.firstName && (
            <small className="text-red-600">{errors.firstName.message}</small>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          />
          {errors.lastName && (
            <small className="text-red-600">{errors.lastName.message}</small>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
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
            {...register("phone")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            placeholder="Enter phone number"
            disabled={!editable}
          />
          {errors.phone && (
            <small className="text-red-600">{errors.phone.message}</small>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Pincode */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Pincode</label>
          <input
            type="text"
            {...register("pinCode", {
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
          {errors.pinCode && (
            <small className="text-red-600">{errors.pinCode.message}</small>
          )}
        </div>

        {/* Landmark */}
        <div className="flex flex-col gap-1">
          <label className="text-sm">Landmark</label>
          <input
            type="text"
            {...register("note")}
            className={`p-2 rounded-md outline-none border-2 w-full ${
              !editable
                ? "bg-primary/20 cursor-not-allowed text-white"
                : "text-black"
            }`}
            disabled={!editable}
          />
          {errors.note && (
            <small className="text-red-600">{errors.note.message}</small>
          )}
        </div>
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

      <div className="grid sm:grid-cols-2 gap-4">
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
      </div>

      <div className="flex gap-5">
        <button type="submit" className="primary-btn">
          Save Address
        </button>
        <button type="button" onClick={onCancel} className="secondary-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
