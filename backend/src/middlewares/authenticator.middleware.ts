import { AuthPayload, AuthRequest } from './../interfaces/auth.interface';
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError";

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	const bearerHeader = req.headers["authorization"]?.split(" ");
	const bearerToken = bearerHeader && bearerHeader[1];

	if (!bearerToken) {
		res.status(401).send({
			success: false,
			message: "unauthorized",
		});
		return;
	}
	try {
		const data = jwt.verify(
			bearerToken,
			process.env.JWT_SECRET || ""
		) as AuthPayload;
		req.user = data;
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return next(new HttpError(401, "Session expired. Please login again"));
		}
		next(new HttpError(403, "Forbidden"));
	}
};