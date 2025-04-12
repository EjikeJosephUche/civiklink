import WebSocket, { WebSocketServer } from "ws";
import ChatService from "./chat.service";
import { IChatMessage } from "../interfaces/chat.interface";
import { verifyJwtToken } from "../utils/jwt.utils";
import { HttpError } from "../utils/httpError";

interface ActiveConnection {
  userId: string;
  socket: WebSocket;
}

export class SocketService {
  private wss: WebSocketServer;
  private activeConnections: ActiveConnection[] = [];
  private chatService = new ChatService();

  constructor(server: any) {
    this.wss = new WebSocketServer({ server, path: "/ws" });

    this.wss.on("connection", (ws: WebSocket, req: any) => {
      // Extract token from query params
      const token = req.url.split("token=")[1]?.split("&")[0];

      if (!token) {
        ws.close(1008, "Authentication required");
        return;
      }

      try {
        const decoded = verifyJwtToken(token);

        this.activeConnections.push({
          userId: decoded.userId,
          socket: ws,
        });

        ws.on("message", (message: string) => {
          this.handleMessage(decoded.userId, message);
        });

        ws.on("close", () => {
          this.activeConnections = this.activeConnections.filter(
            (conn) => conn.userId !== decoded.userId
          );
        });
      } catch (error) {
        const message =
          error instanceof HttpError ? error.message : "Invalid token";
        ws.close(1008, message);
      }
    });
  }

  private async handleMessage(userId: string, message: string) {
    try {
      const { action, data } = JSON.parse(message);

      switch (action) {
        case "SEND_MESSAGE":
          const { chatId, content } = data;
          const newMessage: Omit<IChatMessage, "timestamp" | "read"> = {
            sender: data.sender,
            senderId: userId,
            content,
          };

          const updatedChat = await this.chatService.sendMessage(
            chatId,
            newMessage
          );

          // Notify both parties
          this.notifyChatUpdate(updatedChat);
          break;

        case "MARK_AS_READ":
          const { chatId: readChatId, sender } = data;
          await this.chatService.markMessagesAsRead(readChatId, sender);
          break;
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  }

  private notifyChatUpdate(chat: any) {
    // Notify citizen
    const citizenConnection = this.activeConnections.find(
      (conn) => conn.userId === chat.citizen._id.toString()
    );
    if (citizenConnection) {
      citizenConnection.socket.send(
        JSON.stringify({
          event: "CHAT_UPDATE",
          data: chat,
        })
      );
    }

    // Notify official
    const officialConnection = this.activeConnections.find(
      (conn) => conn.userId === chat.official._id.toString()
    );
    if (officialConnection) {
      officialConnection.socket.send(
        JSON.stringify({
          event: "CHAT_UPDATE",
          data: chat,
        })
      );
    }
  }
}
