import { Router } from "express";
import { verifyToken } from "../middlewares/authenticator.middleware";
import CitizensController from "../controllers/citizens.controller";
import OfficialsController from "../controllers/officials.controller";

const { getCitizenProfile, UpdateCitizenProfile, deleteCitizenProfile } =
  new CitizensController();

const { getOffcials, getOfficialsBySearchKeyword, getOfficialDetailsById } =
  new OfficialsController();

export default function () {
  const router = Router();

  // Citizen profile routes
  router.get("/profile", verifyToken, getCitizenProfile);
  router.put("/profile", verifyToken, UpdateCitizenProfile);
  router.delete("/profile", verifyToken, deleteCitizenProfile);

  // Citizen access to officials
  router.get("/officials", verifyToken, getOffcials);
  router.get("/officials/search", verifyToken, getOfficialsBySearchKeyword);
  router.get("/officials/:id", verifyToken, getOfficialDetailsById);

  return router;
}
