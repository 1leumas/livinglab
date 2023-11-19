const { fetchParticlesData } = require("../repositories/fetchParticlesData");
const { filterByInterval } = require("../utils/intervalFilter");

async function getParticlesData(timeRange, interval) {
  try {
    const data = await fetchParticlesData(timeRange);

    if (interval) {
      return filterByInterval(data, interval);
    }

    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

module.exports = getParticlesData;
