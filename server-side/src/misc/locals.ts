/** @format */

import { ILocals } from "../types/misc.js";
import dotenv from "dotenv";
import path from "path";

export default class Locals {
  public static config(): ILocals {
    const dirname = path.dirname("../../.env");
    dotenv.config({ path: path.join(dirname, "/.env") });

    const PORT = parseInt(process.env.PORT!) || 3000;
    const HOST = process.env.HOST || "http://localhost:";
    const API_Prefix = process.env.API_Prefix || "api/v1";
    const DC_WebHook = process.env.DC_HOOK || "NOT PROVIDED";
    const HeroServerPORT = parseInt(process.env.HERO_SERVER_PORT!) || 6806

    return {
      PORT,
      HOST,
      API_Prefix,
      DC_WebHook,
      HeroServerPORT
    };
  }
}
