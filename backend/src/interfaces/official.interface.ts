import { Document } from "mongoose";

interface IOfficial extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  position: string;
  department: string;
  contactInfo: string;
}

export default IOfficial;
