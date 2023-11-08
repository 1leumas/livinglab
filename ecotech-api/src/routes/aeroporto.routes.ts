import express, { Router } from "express";
import { getAeroportoData } from "../controllers/AeroportoController";

const router: Router = express.Router();

router.get("/aeroporto", getAeroportoData);

export default router;
