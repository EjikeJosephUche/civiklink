import { Router } from "express";
import authRouter from "./auth.route";
import citizenRouter from "./citizen.routes";
import officialRouter from "./official.route";
import chatRouter from "./chat.route";

export default function () {
	const router = Router();

	router.use("/api/auth", authRouter());
	router.use("/api/citizen", citizenRouter());
	router.use("/api/official", officialRouter());
	router.use("/api/chat", chatRouter());

	return router;
}
