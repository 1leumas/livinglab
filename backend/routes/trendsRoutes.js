const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");
const moment = require("moment");
const { filterByInterval } = require('../utils/intervalFilter');

// rota para retornar os dados para a pagina trends
router.get("/trends", async (req, res) => {
  try {
    // extrai os parametros da query
    const { time_range, start_date, end_date, interval } = req.query;

    // inicializa a query para selecionar dados da tabela
    let query = `
      SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time"
      FROM k72623_lo
      WHERE 1=1
    `;
    let params = [];

    // se as datas de inicio e termino estiverem presentes, adiciona clausulas a query para filtrar por esse intervalo de tempo
    if (start_date && end_date) {
      query += " AND time >= $1 AND time <= $2";
      params.push(start_date, end_date);
    }
    // se o time_range estiver presente, calcula a data de inicio com base no intervalo de tempo fornecido e adiciona uma clausula a query
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
            .json({ status: "error", message: "Invalid time range" });
      }
      query += " AND time >= $1";
      params.push(startDate.toISOString());
    }

    // ordena os resultados por tempo
    query += " ORDER BY time ASC";

    // executa a query e armazena os resultados
    const { rows } = await pool.query(query, params);

    // se o parametro interval estiver presente e nao for all, filtra os dados com base no intervalo de tempo fornecido
    if (interval && interval !== "all") {
      const filteredData = filterByInterval(rows, interval);
      res.json({ status: "success", data: filteredData });
    } else {
      res.json({ status: "success", data: rows });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: e.message });
  }
});

module.exports = router;
