const pool = require("../config/dbConfig");

async function getParticlesData() {
  let query = `
  SELECT "deviceName", "time", "temperature", "humidity", "pm2_5", "noise", "voltage"
      FROM k72623_lo
      ORDER BY "time" DESC
      LIMIT 1
    `;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getParticlesData,
};
