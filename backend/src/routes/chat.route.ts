import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import { verifyToken } from "../middlewares/authenticator.middleware";

const { createChat, sendMessage, getChat, getMyChats, updateChatStatus } =
  new ChatController();

export default function (prefixUrl: string, router: Router) {
  // chat routes
  router.post(prefixUrl, verifyToken, createChat);

  router.post(`${prefixUrl}/:chatId/messages`, verifyToken, sendMessage);

  router.get(`${prefixUrl}/:chatId`, verifyToken, getChat);

  router.get(prefixUrl, verifyToken, getMyChats);

  router.patch(`${prefixUrl}/:chatId/status`, verifyToken, updateChatStatus);

  return router;
}
