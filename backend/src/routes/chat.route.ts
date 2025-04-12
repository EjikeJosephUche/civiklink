import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import { verifyToken } from "../middlewares/authenticator.middleware";

const chatController = new ChatController();

export default function () {
  const router = Router();

  // chat routes
  router.post("/", verifyToken, chatController.createChat);

  router.post("/:chatId/messages", verifyToken, chatController.sendMessage);

  router.get("/:chatId", verifyToken, chatController.getChat);

  router.get("/", verifyToken, chatController.getMyChats);

  router.patch("/:chatId/status", verifyToken, chatController.updateChatStatus);

  return router;
}
