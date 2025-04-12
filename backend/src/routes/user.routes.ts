import { verifyToken } from './../middlewares/authenticator.middleware';
import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import OfficialsController from "../controllers/officials.controller";
import CitizensController from "../controllers/citizens.controller";

const { registerCitizen, registerOfficial, loginUser } = new AuthController();
const {
	getOfficialProfile,
	updateOfficialProfile,
	deleteOfficialProfile,
	getOffcials,
	getOfficialsBySearchKeyword,
    getOfficialDetailsById,
} = new OfficialsController();
const { 
    getCitizenProfile, 
    UpdateCitizenProfile, 
    deleteCitizenProfile 
} = new CitizensController();

export default function (prefixUrl:string, router: Router) {

	// Citizen routes
	router.get(`${prefixUrl}/profile`,verifyToken, getCitizenProfile);
	router.put(`${prefixUrl}/profile`,verifyToken, UpdateCitizenProfile);
	router.delete(`${prefixUrl}/profile`,verifyToken, deleteCitizenProfile);
	router.get(`${prefixUrl}/officials`,verifyToken, getOffcials);
	router.get(`${prefixUrl}/officials`,verifyToken, getOfficialsBySearchKeyword);
    router.get(`${prefixUrl}/officials/:id`,verifyToken, getOfficialDetailsById);

}
