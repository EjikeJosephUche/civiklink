import { Schema, model } from "mongoose";
import { IChat, IChatMessage } from "../interfaces/chat.interface";

const chatMessageSchema = new Schema<IChatMessage>({
  sender: { type: String, required: true, enum: ["citizen", "official"] },
  senderId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const chatSchema = new Schema<IChat>(
  {
    citizen: { type: Schema.Types.ObjectId, ref: "Citizens", required: true },
    official: { type: Schema.Types.ObjectId, ref: "Officials", required: true },
    messages: [chatMessageSchema],
    status: {
      type: String,
      enum: ["active", "resolved", "archived"],
      default: "active",
    },
    subject: { type: String, required: true },
  },
  { timestamps: true }
);

const ChatModel = model<IChat>("Chats", chatSchema);
export default ChatModel;
