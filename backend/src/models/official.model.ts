// models/official.js
import mongoose, { Schema } from "mongoose";
import IOfficial from "../interfaces/official.interface";

// Define the schema for the Official model
const officialSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["ADMIN", "OFFICIAL"], // Define the roles available in the system
			default: "OFFICIAL", // Default role is OFFICIAL
			required: true,
		},
    position: { type: String, required: true },
		department: { type: String, required: true },
		contactInfo: { type: String, required: true },
	},
	{ timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
          return {
            name: ret.name,
            department: ret.department,
            position: ret.position,
            contactInfo: ret.contactInfo,
            createdAt: ret.createdAt,
            updatedAt: ret.updatedAt,
          }
        },
    }
   }
);

const OfficialModel = mongoose.model<IOfficial>("Officials", officialSchema);
export default OfficialModel;
