import { z } from "zod";

export const commonSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(2)
    .max(50),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
});

export const registerSchema = commonSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = commonSchema.pick({
  email: true,
  password: true,
});
