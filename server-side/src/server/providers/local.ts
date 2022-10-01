/** @format */

import { Application } from "express";
import dotenv from "dotenv";
import path from "path";

class Locals {
  public static config(): any {
    const dirname = path.dirname("../.env");
    dotenv.config({ path: path.join(dirname, "/.env") });

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || "http://localhost:";
    const API_Prefix = process.env.API_Prefix || "api/v1";

    return {
      PORT,
      HOST,
      API_Prefix,
    };
  }
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
