import express, { Request, Response, Router } from "express";
import pool from "../database/dbPool"; // Database connection pool instance

// Create a new router instance
const router: Router = express.Router();

/**
 * Route to get the latest data entry from the database.
 * This route queries the most recent set of sensor data from the 'k72623_lo' (particles) table.
 */

/**
 * GET /latest
 * Retrieves the most recent data entry from the 'k72623_lo' table.
 * @returns {Response} JSON object containing the status and the latest data entry.
 */
router.get(
  "/latest",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // Initialize the SQL query for selecting data
      const query = `
      SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time", "pm2_5"
      FROM k72623_lo
      ORDER BY "time" DESC
      LIMIT 1
    `;

      // Execute the SQL query and store the result
      const { rows } = await pool.query(query);

      // Return the latest data entry
      return res.json({ status: "success", data: rows });
    } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({ status: "error", message: err.message });
    }
  }
);

// Export the router for use in the main server file
export default router;
