import { z } from "zod";
import pincodes from "indian-pincodes";

// Define the validation schema of address
export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s\-()]{6,14}\d$/, "Please enter a valid phone number"),
  pinCode: z
    .string()
    .min(1, "Pincode is required")
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
  note: z.string().min(1, "Landmark is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

// change password form schema
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
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

//   user profile schema (fullName & email)
export const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});
