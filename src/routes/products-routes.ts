import { ProductController } from "@/controllers/products-controler.js";
import { Router } from "express";

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get("/", productController.index);
productsRoutes.post("/", productController.create);
productsRoutes.put("/:id", productController.update);

export { productsRoutes };