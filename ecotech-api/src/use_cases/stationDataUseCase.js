const { fetchStationData } = require("../repositories/fetchStationData");
const { filterByInterval } = require("../utils/intervalFilter");

async function stationDataUseCase(timeRange, interval, station) {
  try {
    const data = await fetchStationData(timeRange, station);

    if (interval) {
      return filterByInterval(data, interval);
    }

    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

module.exports = stationDataUseCase;
