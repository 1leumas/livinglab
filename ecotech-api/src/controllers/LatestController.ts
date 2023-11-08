import { Request, Response } from "express";
import pool from "../database/dbPool";

/**
 * Handles GET requests to the /latest endpoint.
 *
 * @param req - The request object.
 * @param res - The response object used to send back the desired HTTP response.
 * @returns A JSON object containing the status and the latest data entry.
 */
export async function getLatestData(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const query = `
      SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time", "pm2_5"
      FROM k72623_lo
      ORDER BY "time" DESC
      LIMIT 1
    `;

    const { rows } = await pool.query(query);
    return res.json({ status: "success", data: rows });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
