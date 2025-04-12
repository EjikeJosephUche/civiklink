import { Router } from "express";
import { verifyToken } from "../middlewares/authenticator.middleware";
import OfficialsController from "../controllers/officials.controller";

const { getOfficialProfile, updateOfficialProfile, deleteOfficialProfile } =
  new OfficialsController();

export default function () {
  const router = Router();

  // Official profile routes
  router.get("/profile", verifyToken, getOfficialProfile);
  router.put("/profile", verifyToken, updateOfficialProfile);
  router.delete("/profile", verifyToken, deleteOfficialProfile);

  return router;
}
