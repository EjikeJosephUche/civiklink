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
    res.status(401).send({
      success: false,
      message: "unauthorized",
    });
    return;
  }

  try {
    req.user = verifyJwtToken(bearerToken);
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    }
    next(new HttpError(403, "Forbidden"));
  }
};

export const verifyIsOfficial = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "OFFICIAL") {
    return next(new HttpError(403, "Forbidden. Access denied"));
  }
  next();
};
