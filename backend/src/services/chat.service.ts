import ChatModel from "../models/chat.model";
import { IChat, IChatMessage } from "../interfaces/chat.interface";

export default class ChatService {
  async createChat(citizenId: string, officialId: string, subject: string) {
    const chat = new ChatModel({
      citizen: citizenId,
      official: officialId,
      messages: [],
      status: "active",
      subject,
    });
    return await chat.save();
  }

  async sendMessage(
    chatId: string,
    message: Omit<IChatMessage, "timestamp" | "read">
  ) {
    const newMessage = {
      ...message,
      timestamp: new Date(),
      read: false,
    } as IChatMessage;

    return await ChatModel.findByIdAndUpdate(
      chatId,
      { $push: { messages: newMessage } },
      { new: true }
    );
  }

  async getChatById(chatId: string) {
    return await ChatModel.findById(chatId)
      .populate("citizen", "firstName lastName email")
      .populate("official", "name position department");
  }

  async getChatsByCitizen(citizenId: string) {
    return await ChatModel.find({ citizen: citizenId })
      .populate("official", "name position department")
      .sort({ updatedAt: -1 });
  }

  async getChatsByOfficial(officialId: string) {
    return await ChatModel.find({ official: officialId })
      .populate("citizen", "firstName lastName email")
      .sort({ updatedAt: -1 });
  }

  async markMessagesAsRead(chatId: string, sender: "citizen" | "official") {
    return await ChatModel.updateMany(
      {
        _id: chatId,
        "messages.sender": { $ne: sender },
        "messages.read": false,
      },
      { $set: { "messages.$[].read": true } }
    );
  }

  async updateChatStatus(
    chatId: string,
    status: "active" | "resolved" | "archived"
  ) {
    return await ChatModel.findByIdAndUpdate(chatId, { status }, { new: true });
  }
}
