import { Document } from "mongoose";

interface IOfficial extends Document {
  name: string;
  role: string;
  department: string;
  contactInfo: string;
}

export default IOfficial;
