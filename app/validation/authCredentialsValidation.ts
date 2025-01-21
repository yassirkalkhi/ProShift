
import { z } from 'zod';

export const emailSchema = z.string()
  .min(1, "")
  .email("Invalid Email Format (proceed with @ and .com)")
  .max(255, "Email is too long")
  .trim()
  .toLowerCase()
  .refine((email) => !email.endsWith(".con"), { message: "Did you mean to write .com?" });

export const passwordSchema = z.string()
  .min(1, "")
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .refine((password) => !password.includes(" "), { message: "Password cannot contain spaces" });

export const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
