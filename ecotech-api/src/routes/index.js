const express = require("express");
const latestRouter = require("./latest.routes");
const particlesRouter = require("./particles.routes");
const stationRouter = require("./station.routes");

// Create a new router instance
const router = express.Router();

/**
 * Main router file that aggregates all sub-routers for different endpoints.
 * Each sub-router is responsible for handling requests to a specific set of related routes.
 */

router.use(latestRouter);
router.use(particlesRouter);
router.use(stationRouter);

// Export the router
module.exports = router;
