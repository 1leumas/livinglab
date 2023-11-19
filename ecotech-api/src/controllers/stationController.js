const getStationData = require("../use_cases/stationData");

async function stationController(req, res, station) {
  try {
    const { time_range, interval } = req.query;
    const data = await getStationData(time_range, interval, station);
    res.json({ status: "success", data });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  stationController,
};
