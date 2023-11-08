import express, { Express } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes"; // Assuming routes are properly typed for TypeScript
import corsConfig from "./config/corsConfig"; // Assuming corsConfig is a properly typed export

// Load environment variables from .env file
dotenv.config();

/**
 * Creates an instance of an Express server.
 */
const app: Express = express();

/**
 * The port on which the server will run. Defaults to 5000 if not specified in the environment variables.
 */
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Apply CORS configuration to allow access from the specified frontend url
app.use(corsConfig);

// Define routes for the API
app.use("/api", apiRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

export default app;
