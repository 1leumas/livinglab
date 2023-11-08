import express, { Router } from "express";
import { getLatestData } from "../controllers/LatestController";

const router: Router = express.Router();

router.get("/latest", getLatestData);

export default router;
