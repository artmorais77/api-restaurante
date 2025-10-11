import { Router } from "express";
import { productsRoutes } from "../routes/products-routes.js";

const routes = Router();

routes.use("/products", productsRoutes);

export { routes };