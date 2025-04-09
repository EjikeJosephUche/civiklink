// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Routes
// app.use("/api/government", governmentRoutes);
// app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
