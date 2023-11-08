import express, { Request, Response, Router } from "express";
import pool from "../database/dbPool"; // Instance of the database connection pool

// Create a new router instance
const router: Router = express.Router();

/**
 * Routes for database information such as status, tables, columns, and data.
 * These routes provide a way to check the database connection and to list tables,
 * columns, and data within the database.
 */

/**
 * GET /status
 * Checks the status of the database connection.
 * @returns {Response} JSON object containing the status and message.
 */
router.get(
  "/status",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // Attempt a simple query to check the connection
      await pool.query("SELECT 1");
      // If successful, return a success status
      return res.json({
        status: "success",
        message: "Connected to the database successfully.",
      });
    } catch (error: any) {
      // If an error occurs, log it and return an error status
      console.error(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
);

/**
 * GET /tables
 * Lists all tables in the database.
 * @returns {Response} JSON object containing the status and list of tables.
 */
router.get(
  "/tables",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const query = `
      SELECT tablename
      FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
    `;
      const { rows } = await pool.query(query);
      const tables = rows.map((row: { tablename: string }) => row.tablename);
      return res.json({ status: "success", tables });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
);

/**
 * GET /columns/:table_name
 * Lists all columns of a specific table.
 * @param {string} table_name - The name of the table.
 * @returns {Response} JSON object containing the status and list of columns.
 */
router.get(
  "/columns/:table_name",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { table_name } = req.params;
      const query = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1;
    `;
      const { rows } = await pool.query(query, [table_name]);
      const columns = rows.map(
        (row: { column_name: string }) => row.column_name
      );
      return res.json({ status: "success", columns });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
);

/**
 * GET /data/:table_name
 * Lists all data of a specific table.
 * @param {string} table_name - The name of the table.
 * @returns {Response} JSON object containing the status and the table data.
 */
router.get(
  "/data/:table_name",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { table_name } = req.params;
      const query = `SELECT * FROM ${table_name};`;
      const { rows } = await pool.query(query);
      return res.json({ status: "success", data: rows });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
);

// Export the router for use in the main server file
export default router;
