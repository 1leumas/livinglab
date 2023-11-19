const pool = require("../config/dbConfig");
const moment = require("moment");

async function fetchStationData(timeRange, station) {
  let query = `
        SELECT 
            "emw_rain_lvl", "emw_avg_wind_speed", "emw_gust_wind_speed", "emw_wind_direction", "emw_temperature", "emw_humidity", 
            "emw_luminosity", "emw_uv", "emw_solar_radiation", "emw_atm_pres", "internal_temperature", "internal_humidity", "time", "deviceName"
        FROM nit2xli
        WHERE "deviceName" = $1
    `;
  let params = [station];

  if (timeRange) {
    let startDate = moment();
    switch (timeRange) {
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
        throw new Error("Invalid time range");
    }
    query += " AND time >= $2";
    params.push(startDate.toISOString());
  }

  query += " ORDER BY time ASC";

  const { rows } = await pool.query(query, params);
  return rows;
}

module.exports = {
  fetchStationData,
};
