/** @format */

import dotenv from "dotenv";
import path from "path";
import { Ilocals } from "../types/types";

export default class Locals {
  public static config(): Ilocals {
    const dirname = path.dirname("../../.env");
    dotenv.config({ path: path.join(dirname, "/.env") });

    const PORT = parseInt(process.env.PORT!) || 3000;
    const HOST = process.env.HOST || "http://localhost:";
    const API_Prefix = process.env.API_Prefix || "api/v1";
    const DC_WebHook = process.env.DC_HOOK || "NOT PROVIDED";

    return {
      PORT,
      HOST,
      API_Prefix,
      DC_WebHook,
    };
  }
}
