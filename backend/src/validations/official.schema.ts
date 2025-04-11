import z from "zod";

export const RegisterOfficialSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	position: z.string().min(1, "Position is required"),
	description: z.string().min(1, "Description is required"),
	department: z.string().min(1, "Department is required"),
	contactInfo: z.string().min(1, "Contact information is required"),
}).strict();

export const LoginOfficialSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 6 characters long"),
    role: z.enum(["ADMIN", "OFFICIAL"]).transform((val) => val.toUpperCase()),
}).strict();
