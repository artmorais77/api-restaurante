import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex.js";
import { z } from "zod";
import { AppError } from "@/utils/AppError.js";

class OrdersController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = req.params;

      const orders = await knex<OrdersRepository>("orders")
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "products.name",
          "orders.quantity",
          "orders.price",
          knex.raw("(orders.quantity * orders.price) AS total"),
          "orders.create_at",
          "orders.update_at"
        )
        .join("products", "products.id", "orders.product_id")
        .where({ table_session_id });

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body
      );

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("table session not found");
      }
      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<OrdersRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
