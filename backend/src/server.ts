import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

/* Cors Options configuaration*/

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	exposedHeaders: ["Content-Type", "Authorization"],
};


/* Middleware Registration */

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Connect to database and start server
connectToDatabase().then(() => {
	startServer(port);
});




function startServer(port: number) {
	const server = app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});

	server.on("error", (err: any) => {
		if (err.code === "EADDRINUSE") {
			let newPort = port + 1;
			console.error(`Port ${port} is already in use.`);
			console.log(`Trying to start server on Port ${newPort}`);
			startServer(newPort);
		} else {
			console.error("An error occurred: ", err);
			process.exit(1);
		}
	});
}

async function connectToDatabase() {
	mongoose.Promise = global.Promise; // Use global Promise for mongoose
	mongoose.connect(process.env.MONGO_URI as string)

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB successfully");
    });
    mongoose.connection.on("error", (err) => {
        console.error("Error connecting to MongoDB", err);
    });
}

