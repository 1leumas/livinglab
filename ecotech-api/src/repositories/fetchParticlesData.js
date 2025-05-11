const pool = require("../config/dbConfig");
var moment = require("moment");
require("dotenv").config();

async function fetchParticlesData(timeRange) {
  let query = `
        SELECT "deviceName", "time", "temperature", "humidity", "pm2_5", "noise", "voltage"
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
  let returnValue = [];

  if (process.env.USE_MOCK_DATA !== "true") {
    const { rows } = await pool.query(query, params);
    returnValue = rows;
  } else {
    let rows = [];
    for (let i = 0; i < 100; i++) {
      rows.push({
        deviceName: "Device " + i,
        time: moment().format(),
        temperature: Math.random() * 30,
        humidity: Math.random() * 100,
        pm2_5: Math.random() * 100,
        noise: Math.random() * 100,
        voltage: Math.random() * 10,
      });
    }
    returnValue = rows;
  }

  return returnValue;
}

module.exports = {
  fetchParticlesData,
};
