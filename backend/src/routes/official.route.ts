import { Router } from "express";
import { verifyToken } from "../middlewares/authenticator.middleware";
import OfficialsController from "../controllers/officials.controller";

const { getOfficialProfile, updateOfficialProfile, deleteOfficialProfile } =
  new OfficialsController();

export default function ( prefixUrl:string, router: Router) {
  
  // Official routes
	router.get(`${prefixUrl}/profile`,verifyToken, getOfficialProfile);
	router.put(`${prefixUrl}/profile`,verifyToken, updateOfficialProfile);
	router.delete(`${prefixUrl}/profile`,verifyToken, deleteOfficialProfile);

  return router;
}
