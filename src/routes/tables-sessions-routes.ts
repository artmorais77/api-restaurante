import { TablesSessionsController } from "@/controllers/tables-sessions-controller.js";
import { Router } from "express";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.get("/", tablesSessionsController.index);
tablesSessionsRoutes.post("/", tablesSessionsController.create);

export { tablesSessionsRoutes };
