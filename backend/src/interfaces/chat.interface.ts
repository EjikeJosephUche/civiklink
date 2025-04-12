import IUser from "./user.interface";
import IOfficial from "./official.interface";

export interface IChatMessage {
  sender: string; // 'citizen' or 'official'
  senderId: string; // User ID
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface IChat {
  citizen: string | IUser; // Citizen ID or populated Citizen
  official: string | IOfficial; // Official ID or populated Official
  messages: IChatMessage[];
  status: "active" | "resolved" | "archived";
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}
