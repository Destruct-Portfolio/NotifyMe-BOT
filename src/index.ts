import Handler from "./core/handler.js";
import Schedule from "node-schedule";
import Locals from "./misc/locals.js";

const job1 = Schedule.scheduleJob(
  `* */${Locals.config().PeriodCheckInMinutes} * * * *`,
  async function () {
    await (await new Handler().load().check()).notify();
  }
);
