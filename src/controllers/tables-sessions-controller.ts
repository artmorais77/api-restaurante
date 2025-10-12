import { knex } from "@/database/knex.js";
import { table } from "console";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class TablesSessionsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tablesSessions = await knex<TableSessionRepository>(
        "tables_sessions"
      )
        .select()
        .orderBy("table_id");

      return res.status(200).json(tablesSessions);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(req.body);

      await knex<TableSessionRepository>("tables_sessions").insert({ table_id });
      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
