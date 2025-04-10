import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { reqLogger } from "./middlewares/logger.middleware";
import router from "./routes/router";
import { clientError, notFound } from "./middlewares/errorHandler.middleware";

dotenv.config();
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

/* Cors Options configuaration*/

const corsOptions = {
	// origin: process.env.CLIENT_URL,
	credentials: true,
	// methods: ["GET", "POST", "PUT", "DELETE"],
	// allowedHeaders: ["Content-Type", "Authorization"],
	// exposedHeaders: ["Content-Type", "Authorization"],
};


/* Middleware Registration */

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// For parsing JSON data
app.use(express.json());

// For logging requests
app.use(reqLogger);

// Routes
app.use("/", router());

// Not found Error handling
app.use(notFound);

// Client Error handling
app.use(clientError);



// Connect to database and start server
connectDB().then(() => {
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



