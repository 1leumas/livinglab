import { Request, Response } from "express";
import pool from "../database/dbPool";

export async function checkDatabaseStatus(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    await pool.query("SELECT 1");
    return res.json({
      status: "success",
      message: "Connected to the database successfully.",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
}

export async function listTables(
  req: Request,
  res: Response
): Promise<Response> {
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

export async function listColumns(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { table_name } = req.params;
    const query = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = $1;
    `;
    const { rows } = await pool.query(query, [table_name]);
    const columns = rows.map((row: { column_name: string }) => row.column_name);
    return res.json({ status: "success", columns });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
}

export async function listTableData(
  req: Request,
  res: Response
): Promise<Response> {
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
