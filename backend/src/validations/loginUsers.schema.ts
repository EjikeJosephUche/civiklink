import { z } from "zod";

export const LoginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email({
        message: "Invalid email address format"
    }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).min(8, {
        message: "Password must be at least 8 characters long"
    }),
    role: z.enum(["OFFICIAL", "CITIZEN"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be a string",
        errorMap: () => ({ message: "Role must be either OFFICIAL or CITIZEN" })
    }).transform((val) => val.toUpperCase()),
}).strict({
    message: "Additional fields are not allowed"
});