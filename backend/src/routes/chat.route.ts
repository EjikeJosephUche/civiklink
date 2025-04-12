import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import { verifyToken } from "../middlewares/authenticator.middleware";

const { createChat, sendMessage, getChat, getMyChats, updateChatStatus } =
  new ChatController();

export default function () {
  // chat routes
  const router = Router();
  

  // Chat routes
  router.post("/", verifyToken, createChat);

  router.post(`/:chatId/messages`, verifyToken, sendMessage);

  router.get(`/:chatId`, verifyToken, getChat);

  router.get("/", verifyToken, getMyChats);

  router.patch(`/:chatId/status`, verifyToken, updateChatStatus);

  return router;
}
