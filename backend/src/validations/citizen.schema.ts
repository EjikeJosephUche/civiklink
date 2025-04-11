import z from "zod";

export const RegisterCitizenSchema = z.object({
	username: z.string().min(1, "Username is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[^A-Za-z0-9]/,"Password must contain at least one special character"),
}).strict();

export const LoginCitizenSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 6 characters long"),
    role: z.enum(["CITIZEN"]).transform((val) => val.toUpperCase())
}).strict();
