const express = require("express");
const router = express.Router();
const { stationController } = require("../controllers/stationController");

router.get("/aeroporto", (req, res) =>
  stationController(req, res, "Estação Aeroporto")
);

router.get("/cruzeiro", (req, res) =>
  stationController(req, res, "Estação Cruzeiro")
);

module.exports = router;
