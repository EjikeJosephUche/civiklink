import z from "zod";

export const RegisterOfficialSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	position: z.string().min(1, "Position is required"),
	description: z.string().min(1, "Description is required"),
	department: z.string().min(1, "Department is required"),
	contactInfo: z.string().min(1, "Contact information is required"),
}).strict({
	message: "Additional fields are not allowed",
});

export const UpdateOfficialSchema = z.object({
	name: z.string().optional(),
	email: z.string().email("Invalid email address").optional(),
	password: z.string().optional(),
	position: z.string().optional(),
	description: z.string().optional(),
	department: z.string().optional(),
	contactInfo: z.string().optional(),
}).strict({
	message: "Additional fields are not allowed",
});
