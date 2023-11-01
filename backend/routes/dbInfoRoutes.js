const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");

// saber se o banco de dados esta conectado
router.get("/status", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "success",
      message: "Connected to the database successfully.",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: e.message });
  }
});

// saber todas as tabelas
router.get("/tables", async (req, res) => {
  try {
    const query =
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';";
    const { rows } = await pool.query(query);
    const tables = rows.map((row) => row.tablename);
    res.json({ status: "success", tables });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: e.message });
  }
});

// saber todas as colunas de uma tabela
router.get("/columns/:table_name", async (req, res) => {
  try {
    const { table_name } = req.params;
    const query =
      "SELECT column_name FROM information_schema.columns WHERE table_name = $1;";
    const { rows } = await pool.query(query, [table_name]);
    const columns = rows.map((row) => row.column_name);
    res.json({ status: "success", columns });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: e.message });
  }
});

// saber todos os dados de uma tabela
router.get("/data/:table_name", async (req, res) => {
  try {
    const { table_name } = req.params;
    const { rows } = await pool.query(`SELECT * FROM ${table_name}`);
    res.json({ status: "success", data: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: e.message });
  }
});

module.exports = router;
