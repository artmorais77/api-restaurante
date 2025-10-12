import { TableController } from "@/controllers/tables-controller.js";
import { Router } from "express";

const tablesRoutes = Router();
const tableController = new TableController();

tablesRoutes.get("/", tableController.index);

export { tablesRoutes };
