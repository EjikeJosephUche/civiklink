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
const { getCitizenProfile, UpdateCitizenProfile, deleteCitizenProfile } =
	new CitizensController();

export default function (router: Router) {
	//Auth routes
	router.post("/api/auth/register", registerCitizen);
	router.post("/api/auth/admin/register", registerOfficial);
	router.post("/api/auth/login", loginUser);

	// Citizen routes
	router.get("/api/user/profile",verifyToken, getCitizenProfile);
	router.put("/api/user/profile",verifyToken, UpdateCitizenProfile);
	router.delete("/api/user/profile",verifyToken, deleteCitizenProfile);
	router.get("/api/user/officials",verifyToken, getOffcials);
	router.get("/api/user/officials/",verifyToken, getOfficialsBySearchKeyword);
    router.get("/api/user/officials/:id",verifyToken, getOfficialDetailsById);


	// Official routes
	router.get("/api/oficial/profile",verifyToken, getOfficialProfile);
	router.put("/api/official/profile",verifyToken, updateOfficialProfile);
	router.delete("/api/oficial/profile",verifyToken, deleteOfficialProfile);
}
