import { z } from "zod";

// SIGNUP VALIDATION
export const signupSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    address: z.string().nonempty("Address is required"),
    email: z.string().email("Invalid email"),
    mobile: z.string().min(10, "Mobile number is too short"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["RESIDENT", "EMPLOYEE"]).optional(),
    idUpload: z.string().optional(),
});

export type SignupFormData = z.infer<typeof signupSchema>;


// LOGIN VALIDATION
export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;