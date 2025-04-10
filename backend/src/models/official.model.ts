// models/official.js
import mongoose, { Schema } from "mongoose";
import IOfficial from "../interfaces/official.interface";

// Define the schema for the Official model
const officialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true }
);

const OfficialModel = mongoose.model<IOfficial>("Official", officialSchema);
export default OfficialModel;
