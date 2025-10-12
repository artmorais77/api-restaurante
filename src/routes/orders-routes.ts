import { Router } from "express"
import { OrdersController } from "../controllers/orders-controller.js"

const ordersRoutes = Router()
const ordersController = new OrdersController

ordersRoutes.get("/:table_session_id", ordersController.index)
ordersRoutes.get("/:table_session_id/total", ordersController.showResume)
ordersRoutes.post("/", ordersController.create)

export { ordersRoutes }