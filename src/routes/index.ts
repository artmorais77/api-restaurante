import { Router } from "express";
import { productsRoutes } from "../routes/products-routes.js";
import { tablesRoutes } from "./tables-routes.js";

const routes = Router();

routes.use("/products", productsRoutes);
routes.use("/tables", tablesRoutes)

export { routes };