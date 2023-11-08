import express, { Router } from "express";
import {
  checkDatabaseStatus,
  listTables,
  listColumns,
  listTableData,
} from "../controllers/InfoController";

const router: Router = express.Router();

router.get("/status", checkDatabaseStatus);
router.get("/tables", listTables);
router.get("/columns/:table_name", listColumns);
router.get("/data/:table_name", listTableData);

export default router;
