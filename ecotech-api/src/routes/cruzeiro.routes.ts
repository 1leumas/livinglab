import express, { Router } from "express";
import { getCruzeiroData } from "../controllers/CruzeiroController";

const router: Router = express.Router();

router.get("/cruzeiro", getCruzeiroData);

export default router;
