import { requestQueryValidator, RequestValidator } from './../middlewares/validators.middleware';
import { Router } from "express";
import { verifyIsRole, verifyToken } from "../middlewares/authenticator.middleware";
import CitizensController from "../controllers/citizens.controller";
import OfficialsController from "../controllers/officials.controller";
import { UpdateCitizenSchema } from '../validations/citizen.schema';
import { QuerySchema } from '../validations/query.schema';

const { getCitizenProfile, UpdateCitizenProfile, deleteCitizenProfile } =
  new CitizensController();

const { getOffcials, getOfficialsBySearchKeyword, getOfficialDetailsById } =
  new OfficialsController();
const router = Router();
export default function () {
  
  // Citizen access to officials
  router.get("/officials", verifyToken, verifyIsRole("CITIZEN"), getOffcials);
  router.get("/officials/search", verifyToken, verifyIsRole("CITIZEN"),  getOfficialsBySearchKeyword);
  router.get("/officials/:id", verifyToken, verifyIsRole("CITIZEN"), requestQueryValidator(QuerySchema), getOfficialDetailsById);
  
  // Citizen profile routes
  router.get("/profile", verifyToken, verifyIsRole("CITIZEN"), getCitizenProfile);
  router.put("/profile", verifyToken, verifyIsRole("CITIZEN"), RequestValidator(UpdateCitizenSchema), UpdateCitizenProfile);
  router.delete("/profile", verifyToken, verifyIsRole("CITIZEN"), deleteCitizenProfile);



  return router;
}
