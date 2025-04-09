import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string; // e.g., 'admin', 'user'
  verificationStatus: boolean; // e.g., true for verified, false for not verified
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;
// This interface defines the structure of a User document in MongoDB.
// It extends the Mongoose Document interface to include additional fields like createdAt and updatedAt.
