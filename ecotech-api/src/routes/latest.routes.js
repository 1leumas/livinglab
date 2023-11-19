const express = require("express");
const router = express.Router();
const { latestController } = require("../controllers/latestController");

router.get("/latest", (req, res) => latestController(req, res));

module.exports = router;
