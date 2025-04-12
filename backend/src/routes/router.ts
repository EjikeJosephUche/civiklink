import { Router } from "express";
import authRoutes from "./auth.routes";
import citizenRouter from "./user.routes";
import officialRouter from "./official.route";
import chatRouter from "./chat.route";

const router = Router();

export default ():Router => {

    authRoutes("/api/auth", router);
    citizenRouter("/api/citizen", router);
    officialRouter("/api/oficial", router);
    chatRouter("/api/chat", router);
    return router;
};

// // import express from "express";
// // import authRouter from "./auth.routes";


// export default function (): Router {
  
//   router.use("/api/auth", authRouter(router));
//   router.use("/api/citizen", citizenRouter(router));
//   router.use("/api/official", officialRouter());
//   router.use("/api/chat", chatRouter());

//   return router;
// }
