import { Router } from "express";
import { verifyIsRole, verifyToken } from "../middlewares/authenticator.middleware";
import OfficialsController from "../controllers/officials.controller";

const { 
  getOfficialProfile, 
  updateOfficialProfile, 
  deleteOfficialProfile 
} = new OfficialsController();


export default function () {
  const router = Router();

  // Official profile routes
  router.get("/profile", verifyToken, verifyIsRole("OFFICIAL"), getOfficialProfile);
  router.put("/profile", verifyToken, verifyIsRole("OFFICIAL"), updateOfficialProfile);
  router.delete("/profile", verifyToken, verifyIsRole("OFFICIAL"), deleteOfficialProfile);

  return router;
}
