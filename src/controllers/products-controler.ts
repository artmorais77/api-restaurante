import { knex } from "@/database/knex.js";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class ProductController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("ok");
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(req.body);

      await knex<ProductRepository>("products").insert({ name, price })

      return res.status(201).json({ name, price });
    } catch (error) {
      next(error)
    }
  }
}

export { ProductController };
