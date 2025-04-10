import { Router } from "express";
import authRoutes from "./user.routes"

const router = Router();

export default ():Router => {

    authRoutes(router);
    return router;
};