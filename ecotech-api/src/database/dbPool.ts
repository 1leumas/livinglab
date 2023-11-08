import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Interface for the PostgreSQL database configuration.
 */
interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

/**
 * Retrieves the database configuration from environment variables.
 * Provides default values if certain environment variables are not set.
 *
 * @returns {DbConfig} The database configuration object.
 */
function getDatabaseConfig(): DbConfig {
  return {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database",
    port: parseInt(process.env.DB_PORT || "5432", 10),
  };
}

// Get the database configuration
const dbConfig: DbConfig = getDatabaseConfig();

/**
 * A pool of database connections.
 * This pool will manage multiple connections to the PostgreSQL database,
 * reusing and managing these connections to improve efficiency.
 */
const pool = new Pool(dbConfig);

export default pool;
