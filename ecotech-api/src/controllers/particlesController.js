const particlesDataUseCase = require("../use_cases/particlesDataUseCase");

async function particlesController(req, res) {
  try {
    const { time_range, interval } = req.query;
    const data = await particlesDataUseCase(time_range, interval);
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
  particlesController,
};
