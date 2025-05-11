const pool = require("../config/dbConfig");
const moment = require("moment");
require("dotenv").config();

async function getParticlesData() {
  let query = `
  SELECT "deviceName", "time", "temperature", "humidity", "pm2_5", "noise", "voltage"
      FROM k72623_lo
      ORDER BY "time" DESC
      LIMIT 1
    `;

  if (process.env.USE_MOCK_DATA !== "true") {
    const { rows } = await pool.query(query);
    return rows;
  } else {
    return [{
      deviceName: "Auto Gen Device",
      time: moment().format(),
      temperature: Math.random() * 30,
      humidity: Math.random() * 100,
      pm2_5: Math.random() * 100,
      noise: Math.random() * 100,
      voltage: Math.random() * 10,
    }];
  }
}

module.exports = {
  getParticlesData,
};
