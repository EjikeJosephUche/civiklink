import jwt from "jsonwebtoken";
import { AuthPayload } from "../interfaces/auth.interface";
import { HttpError } from "./httpError";

export const verifyJwtToken = (token: string): AuthPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "") as AuthPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new HttpError(401, "Session expired. Please login again");
    }
    throw new HttpError(403, "Forbidden");
  }
};
