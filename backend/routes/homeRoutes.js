const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");

// rota para retornar os dados para a pagina home
router.get("/latest", async (req, res) => {
  try {
    // executa a query e armazena os resultados
    const { rows } = await pool.query(
      'SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time" FROM k72623_lo ORDER BY "time" DESC LIMIT 1'
    );
    // retorna os resultados
    res.json({ status: "success", data: rows });
  } catch (err) {
    console.error(err.message);
    res.json({ status: "error", message: err.message });
  }
});

module.exports = router;
