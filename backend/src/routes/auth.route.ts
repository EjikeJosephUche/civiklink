import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const { registerCitizen, registerOfficial, loginUser } = new AuthController();

export default function () {
  const router = Router();

  // Auth routes
  router.post("/register", registerCitizen);
  router.post("/admin/register", registerOfficial);
  router.post("/login", loginUser);

  return router;
}
