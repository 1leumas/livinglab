const pool = require("../config/dbConfig");
const moment = require("moment");

async function fetchParticlesData(timeRange) {
  let query = `
        SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time", "pm2_5"
        FROM k72623_lo
        WHERE 1=1
    `;
  let params = [];

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
    query += " AND time >= $1";
    params.push(startDate.toISOString());
  }

  query += " ORDER BY time ASC";

  const { rows } = await pool.query(query, params);
  return rows;
}

module.exports = {
  fetchParticlesData,
};
