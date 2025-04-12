import { AuthRequest } from "./../interfaces/auth.interface";
import { Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/jwt.utils";
import { HttpError } from "../utils/httpError";

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const bearerHeader = req.headers["authorization"]?.split(" ");
  const bearerToken = bearerHeader && bearerHeader[1];

  if (!bearerToken) {
    return next(new HttpError(401, "Unauthorized"));
  }

  try {
    req.user = verifyJwtToken(bearerToken);
    next();
  } catch (error) {
    next(new HttpError(403, "Forbidden"));
  }
};

export const verifyIsRole = (role: string) => (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== role) {
    return next(new HttpError(403, "Forbidden. Access denied"));
  }
  next();
};
