const getLatestData = require("../use_cases/latestData");

async function latestController(req, res) {
  try {
    const data = await getLatestData();
    res.json({ status: "success", data });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  latestController,
};
