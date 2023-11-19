const getParticlesData = require("../use_cases/particlesData");

async function particlesController(req, res) {
  try {
    const { time_range, interval } = req.query;
    const data = await getParticlesData(time_range, interval);
    res.json({ status: "success", data });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  particlesController,
};
