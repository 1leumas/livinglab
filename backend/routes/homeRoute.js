const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");

/**
 * Rota para retornar os dados mais recentes para a página inicial (home).
 *
 * @route GET /latest
 * @returns {Object} Objeto JSON contendo o status e os dados mais recentes.
 */
router.get("/latest", async (req, res) => {
  try {
    // Query para buscar os dados mais recentes da tabela
    const query = `
      SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time"
      FROM k72623_lo
      ORDER BY "time" DESC
      LIMIT 1
    `;
    // Executa a query e armazena os resultados
    const { rows } = await pool.query(query);
    // Retorna os resultados
    return res.json({ status: "success", data: rows });
  } catch (err) {
    // Registra o erro e retorna status de erro
    console.error(err.message);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
