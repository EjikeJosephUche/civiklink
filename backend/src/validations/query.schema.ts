import { z } from "zod";

/**
 * Schema validation for query parameters using Zod
 * @remarks
 * This schema enforces strict validation of query parameters with specific field requirements
 * @property page - Optional string field that must be a positive integer
 * @property limit - Optional string field that must be a positive integer
 * @throws {ZodError} When validation fails for any field
 * @example
 * ```typescript
 * const validQuery = {
 *  page: "1",
 * limit: "10"
 * };
 * ```
 */

export const QuerySchema = z.object({
	page: z.string().optional().transform(Number)
		.refine((value) => Number.isInteger(value) && value > 0, {
			message: "page must be a positive whole number or a non fractional number",
		}).default("1"),
	limit: z.string().optional().transform(Number)
		.refine((value) => Number.isInteger(value) && value > 0, {
			message: "limit must be a positive number or a non fractional number",
		}).default("10"),
	searchWord: z.string().optional().transform((val) => val?.trim() ?? "").default(""),
}).strict({
	message: "Invalid query parameters detected",
});