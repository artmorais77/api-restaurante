import { knex } from "@/database/knex.js";
import { AppError } from "@/utils/AppError.js";
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
        .orderBy("closed_at");

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

      const session = await knex<TableSessionRepository>("tables_sessions")
        .select()
        .where({table_id})
        .orderBy("opened_at", "asc")
        .first()

      if (session && !session.closed_at) {
        throw new AppError("this table is already open")
      }

      await knex<TableSessionRepository>("tables_sessions").insert({ table_id });
      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {message: "id must be a number"})
        .parse(req.params.id)

        const session = await knex<TableSessionRepository>("tables_sessions").select().where({id}).first()

        if (!session) {
          throw new AppError("session table not found")
        }
        if(session.closed_at) {
          throw new AppError("this session table is already closed")
        }

        await knex<TableSessionRepository>("tables_sessions").update({closed_at: knex.fn.now()}).where({id})
        res.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}

export { TablesSessionsController };
