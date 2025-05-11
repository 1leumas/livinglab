const pool = require("../config/dbConfig");
const moment = require("moment");
require("dotenv").config();

async function fetchStationData(timeRange, station) {
  let query = `
        SELECT 
            "deviceName", "time", "emw_temperature", "emw_humidity", "emw_rain_lvl", "emw_avg_wind_speed", "emw_gust_wind_speed", "emw_atm_pres",
            "emw_uv", "emw_solar_radiation", "emw_luminosity", "internal_temperature", "internal_humidity"
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

  let returnValue = [];

  if (process.env.USE_MOCK_DATA !== "true") {
    const { rows } = await pool.query(query, params);
    returnValue = rows;
  } else {
    let rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        deviceName: station,
        time: moment().format(),
        emw_temperature: Math.random() * 30,
        emw_humidity: Math.random() * 100,
        emw_rain_lvl: Math.random() * 100,
        emw_avg_wind_speed: Math.random() * 10,
        emw_gust_wind_speed: Math.random() * 10,
        emw_atm_pres: Math.random() * 1000,
        emw_uv: Math.random() * 10,
        emw_solar_radiation: Math.random() * 1000,
        emw_luminosity: Math.random() * 1000,
        internal_temperature: Math.random() * 30,
        internal_humidity: Math.random() * 100,
      });
    }
    returnValue = rows;
  }

  return returnValue;
}

module.exports = {
  fetchStationData,
};
