import mongoose from "mongoose";
import { DB_URI } from "../constants/env";

async function connectDB() {
  mongoose.Promise = global.Promise; // Use global Promise for mongoose
  if (!DB_URI) {
    console.error("❌ DB_URI is not defined in environment variables");
    process.exit(1);
  }
  mongoose.connect(DB_URI);
  mongoose.connection.on("connected", () => {
    console.log("✅ Database connected successfully");
  });
  mongoose.connection.on("error", (error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  });
}


export default connectDB;
