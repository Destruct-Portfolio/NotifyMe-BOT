import dotenv from "dotenv";
import Bot from "./bot.js";

dotenv.config({
  path: "../.env",
});

await new Bot(process.env.BOT_TOKEN!).run();
