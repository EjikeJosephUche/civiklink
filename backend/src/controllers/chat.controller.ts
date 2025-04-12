import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import ChatService from "../services/chat.service";
import { HttpError } from "../utils/httpError";

export default class ChatController {
  private chatService = new ChatService();

  async createChat(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const citizenId = req.user?.userId as string;
      const { officialId, subject } = req.body;

      if (!officialId || !subject) {
        return next(new HttpError(400, "Official ID and subject are required"));
      }

      const chat = await this.chatService.createChat(
        citizenId,
        officialId,
        subject
      );
      res.status(201).send({ success: true, data: chat });
    } catch (error) {
      next(new HttpError(500, "Internal Server Error"));
    }
  }

  async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as string;
      const { chatId, content } = req.body;
      const role = req.user?.role.toLowerCase() as "citizen" | "official";

      if (!chatId || !content) {
        return next(new HttpError(400, "Chat ID and content are required"));
      }

      const message = {
        sender: role,
        senderId: userId,
        content,
      };

      const updatedChat = await this.chatService.sendMessage(chatId, message);

      // Mark other party's messages as read
      await this.chatService.markMessagesAsRead(chatId, role);

      res.status(200).send({ success: true, data: updatedChat });
    } catch (error) {
      next(new HttpError(500, "Internal Server Error"));
    }
  }

  async getChat(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as string;
      const { chatId } = req.params;

      const chat = await this.chatService.getChatById(chatId);
      if (!chat) {
        return next(new HttpError(404, "Chat not found"));
      }

      // Verify user is part of this chat
      if (
        typeof chat.citizen !== "string" &&
        (chat.citizen as { _id: { toString: () => string } })._id.toString() !==
          userId &&
        typeof chat.official !== "string" &&
        (
          chat.official as { _id: { toString: () => string } }
        )._id.toString() !== userId
      ) {
        return next(new HttpError(403, "Unauthorized access to chat"));
      }

      res.status(200).send({ success: true, data: chat });
    } catch (error) {
      next(new HttpError(500, "Internal Server Error"));
    }
  }

  async getMyChats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as string;
      const role = req.user?.role.toLowerCase();

      let chats;
      if (role === "citizen") {
        chats = await this.chatService.getChatsByCitizen(userId);
      } else if (role === "official") {
        chats = await this.chatService.getChatsByOfficial(userId);
      } else {
        return next(new HttpError(403, "Unauthorized role"));
      }

      res.status(200).send({ success: true, data: chats });
    } catch (error) {
      next(new HttpError(500, "Internal Server Error"));
    }
  }

  async updateChatStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as string;
      const { chatId } = req.params;
      const { status } = req.body;

      const chat = await this.chatService.getChatById(chatId);
      if (!chat) {
        return next(new HttpError(404, "Chat not found"));
      }

      // Verify user is part of this chat
      if (
        typeof chat.citizen !== "string" &&
        (chat.citizen as { _id: { toString: () => string } })._id.toString() !==
          userId &&
        typeof chat.official !== "string" &&
        (
          chat.official as { _id: { toString: () => string } }
        )._id.toString() !== userId
      ) {
        return next(new HttpError(403, "Unauthorized access to chat"));
      }

      const updatedChat = await this.chatService.updateChatStatus(
        chatId,
        status
      );
      res.status(200).send({ success: true, data: updatedChat });
    } catch (error) {
      next(new HttpError(500, "Internal Server Error"));
    }
  }
}
