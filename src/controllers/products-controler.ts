import { Request, Response, NextFunction } from "express";

class ProductController {
  index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("ok");
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
