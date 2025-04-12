import { RequestValidator } from './../middlewares/validators.middleware';
import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { RegisterCitizenSchema } from "../validations/citizen.schema";
import { LoginUserSchema } from '../validations/loginUsers.schema';
import { RegisterOfficialSchema } from '../validations/official.schema';

const { registerCitizen, registerOfficial, loginUser } = new AuthController();

export default function () {
  const router = Router();

  // Auth routes
  router.post("/register", RequestValidator(RegisterCitizenSchema), registerCitizen);
  router.post("/admin/register", RequestValidator(RegisterOfficialSchema), registerOfficial);
  router.post("/login", RequestValidator(LoginUserSchema), loginUser);

  return router;
}
