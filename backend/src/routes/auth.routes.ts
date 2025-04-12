import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const { 
  registerCitizen, 
  registerOfficial, 
  loginUser 
} = new AuthController();

export default function (prefixUrl: string, router: Router) {

  // Auth routes
  router.post(`${prefixUrl}/register`, registerCitizen);
  router.post(`${prefixUrl}/admin/register`, registerOfficial);
  router.post(`${prefixUrl}/login`, loginUser);
  return router;
}
