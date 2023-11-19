const getStationData = require("../use_cases/stationData");

async function stationController(req, res, station) {
  try {
    const { time_range, interval } = req.query;
    const data = await getStationData(time_range, interval, station);
    const formattedJson = JSON.stringify({ status: "success", data }, null, 2);

    res.setHeader("Content-Type", "application/json");
    res.send(formattedJson);
  } catch (error) {
    console.error("Error: ", error);
    const formattedError = JSON.stringify(
      { status: "error", message: error.message },
      null,
      2
    );
    res.status(500).send(formattedError);
  }
}

module.exports = {
  stationController,
};
