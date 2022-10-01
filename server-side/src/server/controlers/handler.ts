/** @format */

import { Handler, Request, Response, NextFunction } from "express";

class Handlers {
  public static default(req: Request, res: Response, next: NextFunction): any {
    res.status(404).send("NOT FOUND.");
  }
}

export default Handlers;
 