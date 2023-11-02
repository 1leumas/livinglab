const express = require("express");
const router = express.Router();
const pool = require("../config/dbPool");
const moment = require("moment");
const { filterByInterval } = require("../utils/intervalFilter");

/**
 * Rota para obter os dados da estação Cruzeiro.
 *
 * @route GET /cruzeiro
 * @query {string} time_range - o time range para filtrar os dados. opcoes: lastDay, lastWeek, lastMonth, last3Months, allTime.
 * @query {string} start_date - a data de inicio para filtrar os dados. formato: YYYY-MM-DDTHH:mm:ss.sssZ.
 * @query {string} end_date - a data de fim para filtrar os dados. formato: YYYY-MM-DDTHH:mm:ss.sssZ.
 * @query {string} interval - o intervalo para filtrar os dados. opcoes: all, 1h, 3h, 6h, 12h, 24h.
 * @returns {Object} objeto em json
 */
router.get("/cruzeiro", async (req, res) => {
  try {
    // extrair os parametros da query
    const { time_range, interval } = req.query;

    // inicia a query
    let query = `
      SELECT 
        "emw_rain_lvl", "emw_avg_wind_speed", "emw_gust_wind_speed", "emw_wind_direction", "emw_temperature", "emw_humidity", 
        "emw_luminosity", "emw_uv", "emw_solar_radiation", "emw_atm_pres", "internal_temperature", "internal_humidity", "time", "deviceName"
      FROM nit2xli
      WHERE "deviceName" = $1
    `;
    let params = ["Estação Cruzeiro"];

    // calcula a data de inicio baseado no time_range
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

    // ordena os dados por data
    query += " ORDER BY time ASC";

    // executa a query
    const { rows } = await pool.query(query, params);

    // filtra os dados pelo intervalo
    if (interval && interval !== "all") {
      const filteredData = filterByInterval(rows, interval);
      return res.json({ status: "success", data: filteredData });
    } else {
      return res.json({ status: "success", data: rows });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
});

module.exports = router;
