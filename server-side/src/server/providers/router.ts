/** @format */

import { Application } from "express";
//import Log from "../middlewares/log";
import router from "../routes/route.js";
import Locals from "./local.js";

class Routes {
  public MountApi(_express: Application): Application {
    //  Log.info("Routes :: Mounting API Routes...");
    return _express.use(`/${Locals.config().API_Prefix}`, router);
  }
}

export default new Routes();
