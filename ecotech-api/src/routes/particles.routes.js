const express = require("express");
const router = express.Router();
const { particlesController } = require("../controllers/particlesController");

router.get("/particles", (req, res) => particlesController(req, res));

module.exports = router;
