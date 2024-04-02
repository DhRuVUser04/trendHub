import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .refine((value) => value.trim().length > 0, {
        message: "Name is required",
      }),
    email: z
      .string()
      .email({ message: "Invalid email format." })
      .refine((value) => value.trim().length > 0, {
        message: "Email is required",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    // phoneNumber: z
    //   .string()
    //   .min(10, { message: "Phone number must be at least 10 digits." })
    //   .refine(
    //     (value) => {
    //       // Convert the number to a string
    //       const phoneNumberString = String(value);

    //       // You can add custom validation logic for phone numbers here.
    //       // For example, you can check if the phone number matches a specific format.
    //       // This is just a placeholder; replace it with your actual validation logic.
    //       return /^[0-9]{10}$/.test(phoneNumberString); // Assuming a 10-digit phone number format
    //     },
    //     {
    //       message: "Invalid phone number format. Use a 10-digit number.",
    //     }
    //   )
    //   .refine((value) => value.toString().trim().length > 0, {
    //     message: "Phone Number is required",
    //   }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type logInSchema = z.infer<typeof logInSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
