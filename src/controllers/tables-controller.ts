import { knex } from "@/database/knex.js";
import { Request, Response, NextFunction } from "express";

class TableController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number");

      res.status(200).json(tables);
    } catch (error) {
      next(error);
    }
  }
}

export { TableController };
