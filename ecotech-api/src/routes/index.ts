import express, { Router } from "express";
import latestRouter from "./latest.routes";
import particulasRouter from "./particulas.routes";
import aeroportoRouter from "./aeroporto.routes";
import cruzeiroRouter from "./cruzeiro.routes";
import infoRouter from "./info.routes";

// Create a new router instance
const router: Router = express.Router();

/**
 * Main router file that aggregates all sub-routers for different endpoints.
 * Each sub-router is responsible for handling requests to a specific set of related routes.
 */

router.use(latestRouter);
router.use(particulasRouter);
router.use(aeroportoRouter);
router.use(cruzeiroRouter);
router.use(infoRouter);

// Export the router
export default router;
