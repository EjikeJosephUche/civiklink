import { UpdateOfficialSchema } from './../validations/official.schema';
import { Router } from "express";
import { verifyIsRole, verifyToken } from "../middlewares/authenticator.middleware";
import OfficialsController from "../controllers/officials.controller";
import { RequestValidator } from "../middlewares/validators.middleware";

const { 
  getOfficialProfile, 
  updateOfficialProfile, 
  deleteOfficialProfile 
} = new OfficialsController();


export default function () {
  const router = Router();

  // Official profile routes
  router.get("/profile", verifyToken, verifyIsRole("OFFICIAL"), getOfficialProfile);
  router.put("/profile", verifyToken, verifyIsRole("OFFICIAL"), RequestValidator(UpdateOfficialSchema), updateOfficialProfile);
  router.delete("/profile", verifyToken, verifyIsRole("OFFICIAL"), deleteOfficialProfile);

  return router;
}
