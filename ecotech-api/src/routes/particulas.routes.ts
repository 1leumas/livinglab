import express, { Router } from "express";
import { getParticulasData } from "../controllers/ParticulasController";

const router: Router = express.Router();

router.get("/particulas", getParticulasData);

export default router;
