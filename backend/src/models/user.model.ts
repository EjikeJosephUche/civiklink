import { Schema, model } from "mongoose";
import IUser from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
        verificationStatus: { type: Boolean, default: false }, // Default is false (not verified)
		role: {
			type: String,
			enum: ["ADMIN", "OFFICIAL", "CITIZEN"], // Define the roles available in the system
            default: "CITIZEN", // Default role is CITIZEN
			required: true,
		}, 
	},
	{ timestamps: true } // Automatically add createdAt and updatedAt fields
);

export default model<IUser>("Users", UserSchema);
// This code defines a Mongoose schema and model for a User entity in a MongoDB database.
