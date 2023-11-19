const pool = require("../config/dbConfig");

async function getParticlesData() {
  let query = `
    SELECT "deviceName", "temperature", "humidity", "noise", "voltage", "time", "pm2_5"
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
