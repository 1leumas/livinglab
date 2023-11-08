import express, { Request, Response, Router } from "express";
import pool from "../database/dbPool"; // Database connection pool instance
import moment from "moment";
import { filterByInterval } from "../utils/intervalFilter"; // Utility function for filtering data

// Define the structure for the expected query parameters
interface QueryParams {
  time_range?: string;
  interval?: string;
}

// Create a new router instance
const router: Router = express.Router();

/**
 * Endpoint to retrieve particle data.
 *
 * GET /particulas
 * Retrieves particle data based on the provided time range and interval.
 * @param {QueryParams} req.query - The query parameters for time range and interval filtering.
 * @returns {Response} JSON object containing the status and the filtered data.
 */
router.get(
  "/particulas",
  async (
    req: Request<any, any, any, QueryParams>,
    res: Response
  ): Promise<Response> => {
    try {
      // Destructure the time range and interval from the query parameters
      const { time_range, interval } = req.query;

      // Initialize the SQL query for selecting data
      let query = `
      SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time", "pm2_5"
      FROM k72623_lo
      WHERE 1=1
    `;
      // Parameters for the SQL query
      let params: string[] = [];

      // Calculate the start date based on the provided time range and modify the query accordingly
      if (time_range) {
        let startDate = moment();
        switch (time_range) {
          case "lastDay":
            startDate.subtract(1, "days");
            break;
          case "lastWeek":
            startDate.subtract(1, "weeks");
            break;
          case "lastMonth":
            startDate.subtract(1, "months");
            break;
          case "last3Months":
            startDate.subtract(3, "months");
            break;
          case "allTime":
            startDate = moment("1970-01-01");
            break;
          default:
            return res
              .status(400)
              .json({ status: "error", message: "Invalid time range" });
        }
        query += " AND time >= $1";
        params.push(startDate.toISOString());
      }

      // Append order by clause to the SQL query
      query += " ORDER BY time ASC";

      // Execute the SQL query and store the result
      const { rows } = await pool.query(query, params);

      // Filter the data based on the provided interval if it's not 'all'
      if (interval && interval !== "all") {
        const filteredData = filterByInterval(rows, interval);
        return res.json({ status: "success", data: filteredData });
      } else {
        return res.json({ status: "success", data: rows });
      }
    } catch (e: any) {
      // Log the error and return a 500 status code with an error message
      console.error(e);
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// Export the router for use in the main server file
export default router;
