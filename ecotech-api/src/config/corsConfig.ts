import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * CORS (Cross-Origin Resource Sharing) configuration.
 * CORS is a mechanism that allows resources on a web page to be requested from a domain different from the domain of the application itself.
 * This module configures CORS for the Express application.
 *
 * @module corsConfig
 */

/**
 * CORS configuration options.
 * Defines the rules for the domains that can access the server's resources.
 */
const corsOptions: cors.CorsOptions = {
  // Defines the URL of the frontend that is allowed to access the backend resources.
  // It can be a specific string, an array of strings, or a function.
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Provide a default value in case the environment variable is not set

  // Defines the HTTP status code to be returned for browsers that may have issues with the default status code 204,
  // which is used in responses to preflight requests.
  optionsSuccessStatus: 200,
};

/**
 * Express middleware to enable CORS with the defined options.
 * Can be applied globally or to specific routes of the application.
 */
const corsConfig = cors(corsOptions);

export default corsConfig;
