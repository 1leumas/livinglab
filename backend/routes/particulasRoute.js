const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");
const moment = require("moment");
const { filterByInterval } = require("../utils/intervalFilter");

/**
 * Rota para retornar os dados para a página de tendências (trends).
 *
 * @route GET /particulas
 * @query {string} time_range - Intervalo de tempo para filtrar os dados. Opções: lastDay, lastWeek, lastMonth, last3Months, allTime.
 * @query {string} start_date - Data de início para filtrar os dados. Formato: YYYY-MM-DDTHH:mm:ss.sssZ.
 * @query {string} end_date - Data de término para filtrar os dados. Formato: YYYY-MM-DDTHH:mm:ss.sssZ.
 * @query {string} interval - Intervalo para filtrar os dados. Opções: all, ou qualquer string de intervalo válida.
 * @returns {Object} Objeto JSON contendo o status e os dados.
 */
router.get("/particulas", async (req, res) => {
  try {
    // Extrai os parâmetros da query
    const { time_range, start_date, end_date, interval } = req.query;

    // Inicializa a query para selecionar dados da tabela
    let query = `
      SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time", "pm2_5"
      FROM k72623_lo
      WHERE 1=1
    `;
    let params = [];

    // Adiciona cláusulas à query para filtrar por intervalo de tempo, se as datas de início e término estiverem presentes
    if (start_date && end_date) {
      query += " AND time >= $1 AND time <= $2";
      params.push(start_date, end_date);
    }
    // Calcula a data de início com base no intervalo de tempo fornecido e adiciona uma cláusula à query, se o time_range estiver presente
    else if (time_range) {
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
            .json({ status: "error", message: "Intervalo de tempo inválido" });
      }
      query += " AND time >= $3";
      params.push(startDate.toISOString());
    }

    // Ordena os resultados por tempo
    query += " ORDER BY time ASC";

    // Executa a query e armazena os resultados
    const { rows } = await pool.query(query, params);

    // Filtra os dados com base no intervalo de tempo fornecido, se o parâmetro interval estiver presente e não for 'all'
    if (interval && interval !== "all") {
      const filteredData = filterByInterval(rows, interval);
      return res.json({ status: "success", data: filteredData });
    } else {
      return res.json({ status: "success", data: rows });
    }
  } catch (e) {
    // Registra o erro e retorna status de erro
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
});

module.exports = router;
