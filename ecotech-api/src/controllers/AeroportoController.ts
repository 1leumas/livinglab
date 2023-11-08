import { Request, Response } from "express";
import pool from "../database/dbPool";
import moment from "moment";
import { filterByInterval } from "../utils/intervalFilter";

interface QueryParams {
  time_range?: string;
  interval?: string;
}

/**
 * Handles GET requests to the /aeroporto endpoint.
 *
 * @param req - The request object containing query parameters.
 * @param res - The response object used to send back the desired HTTP response.
 * @returns A JSON object containing the status and filtered data based on the time range and interval.
 */
export async function getAeroportoData(
  req: Request<any, any, any, QueryParams>,
  res: Response
): Promise<Response> {
  try {
    const { time_range, interval } = req.query;
    let query = `
      SELECT 
        "emw_rain_lvl", "emw_avg_wind_speed", "emw_gust_wind_speed", "emw_wind_direction", "emw_temperature", "emw_humidity", 
        "emw_luminosity", "emw_uv", "emw_solar_radiation", "emw_atm_pres", "internal_temperature", "internal_humidity", "time", "deviceName"
      FROM nit2xli
      WHERE "deviceName" = $1
    `;
    let params: string[] = ["Estação Aeroporto"];

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

    const { rows } = await pool.query(query, params);

    if (interval && interval !== "all") {
      const filteredData = filterByInterval(rows, interval);
      return res.json({ status: "success", data: filteredData });
    } else {
      return res.json({ status: "success", data: rows });
    }
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
}
