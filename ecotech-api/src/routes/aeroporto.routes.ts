import express, { Request, Response, Router } from "express";
import pool from "../database/dbPool";
import moment from "moment";
import { filterByInterval } from "../utils/intervalFilter";

// Create a new router instance
const router: Router = express.Router();

// Define an interface for the expected query parameters
interface QueryParams {
  time_range?: string;
  interval?: string;
}

/**
 * Endpoint to retrieve station data.
 *
 * @route GET /aeroporto
 * @param req - The request object containing query parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @returns A JSON object containing the status and filtered data based on the time range and interval.
 */
router.get(
  "/aeroporto",
  async (req: Request<any, any, any, QueryParams>, res: Response) => {
    try {
      // Destructure the time range and interval from the query parameters
      const { time_range, interval } = req.query;

      // Initialize the SQL query for selecting data
      let query = `
        SELECT 
          "emw_rain_lvl", "emw_avg_wind_speed", "emw_gust_wind_speed", "emw_wind_direction", "emw_temperature", "emw_humidity", 
          "emw_luminosity", "emw_uv", "emw_solar_radiation", "emw_atm_pres", "internal_temperature", "internal_humidity", "time", "deviceName"
        FROM nit2xli
        WHERE "deviceName" = $1
      `;
      // Parameters for the SQL query
      let params: string[] = ["Estação Aeroporto"];

      // Calculate the start date based on the time range and modify the query accordingly
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
        query += " AND time >= $2";
        params.push(startDate.toISOString());
      }

      // Append order by clause to the SQL query
      query += " ORDER BY time ASC";

      // Execute the SQL query and store the result
      const { rows } = await pool.query(query, params);

      // Filter the data based on the interval if provided and not 'all'
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
