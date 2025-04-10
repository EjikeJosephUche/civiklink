import { Router } from "express";
import UserController from "../controllers/user.controller";

const { registerCitizen, registerOfficial, loginUser } = new UserController();

export default function (router: Router) {
	router.post("/api/auth/register", registerCitizen);
    router.post("/api/auth/admin/register", registerOfficial);
    router.post("/api/auth/login", loginUser);
}
