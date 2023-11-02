const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");

/**
 * Verifica o status da conexão com o banco de dados.
 * 
 * @route GET /status
 * @returns {Object} Objeto JSON contendo o status e a mensagem.
 */
router.get("/status", async (req, res) => {
  try {
    // Tenta executar uma query simples para verificar a conexão
    await pool.query("SELECT 1");
    // Se a query for bem-sucedida, retorna status de sucesso
    return res.json({
      status: "success",
      message: "Connected to the database successfully.",
    });
  } catch (e) {
    // Se ocorrer um erro, registra o erro e retorna status de erro
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
});

/**
 * Lista todas as tabelas no banco de dados.
 * 
 * @route GET /tables
 * @returns {Object} Objeto JSON contendo o status e a lista de tabelas.
 */
router.get("/tables", async (req, res) => {
  try {
    // Query para buscar todas as tabelas que não são do sistema
    const query =
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';";
    // Executa a query e armazena os resultados em rows
    const { rows } = await pool.query(query);
    // Mapeia os resultados para obter apenas os nomes das tabelas
    const tables = rows.map((row) => row.tablename);
    // Retorna a lista de tabelas
    return res.json({ status: "success", tables });
  } catch (e) {
    // Se ocorrer um erro, registra o erro e retorna status de erro
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
});

/**
 * Lista todas as colunas de uma tabela específica.
 * 
 * @route GET /columns/:table_name
 * @param {string} table_name - Nome da tabela.
 * @returns {Object} Objeto JSON contendo o status e a lista de colunas.
 */
router.get("/columns/:table_name", async (req, res) => {
  try {
    // Extrai o nome da tabela dos parâmetros da rota
    const { table_name } = req.params;
    // Query para buscar todas as colunas da tabela especificada
    const query =
      "SELECT column_name FROM information_schema.columns WHERE table_name = $1;";
    // Executa a query e armazena os resultados em rows
    const { rows } = await pool.query(query, [table_name]);
    // Mapeia os resultados para obter apenas os nomes das colunas
    const columns = rows.map((row) => row.column_name);
    // Retorna a lista de colunas
    return res.json({ status: "success", columns });
  } catch (e) {
    // Se ocorrer um erro, registra o erro e retorna status de erro
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
});

/**
 * Lista todos os dados de uma tabela específica.
 * 
 * @route GET /data/:table_name
 * @param {string} table_name - Nome da tabela.
 * @returns {Object} Objeto JSON contendo o status e os dados da tabela.
 */
router.get("/data/:table_name", async (req, res) => {
  try {
    // Extrai o nome da tabela dos parâmetros da rota
    const { table_name } = req.params;
    // Query para buscar todos os dados da tabela especificada
    const query = `SELECT * FROM ${table_name}`;
    // Executa a query e armazena os resultados em rows
    const { rows } = await pool.query(query);
    // Retorna os dados da tabela
    return res.json({ status: "success", data: rows });
  } catch (e) {
    // Se ocorrer um erro, registra o erro e retorna status de erro
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
});

module.exports = router;
