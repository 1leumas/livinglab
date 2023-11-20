const getLatestDataUseCase = require("../use_cases/latestDataUseCase");

async function latestController(req, res) {
  try {
    const data = await getLatestDataUseCase();
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
  latestController,
};
