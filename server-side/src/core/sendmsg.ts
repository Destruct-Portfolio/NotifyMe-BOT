import axios from "axios";
import Logger from "../misc/logger";
import { IDiscordMsg } from "../types/types";
/**
 * a class to consume the Discord Webhook
 */

export class NotifyUser {
  private URL: string | null;
  public msg: IDiscordMsg;
  #logger: Logger;
  /**
   * @param webhookurl the webhook url Provided by your Discord Channel
   */

  constructor(webhookurl: string, msg: IDiscordMsg) {
    this.URL = webhookurl;
    this.msg = msg;
    this.#logger = new Logger("Notify", "Notify");
  }
  async _exec() {
    this.#logger.info(`[+] Sending msg to ${this.URL}`);
    try {
      let send_msg = await axios.post(this.URL!, this.msg, {
        headers: { "content-type": "application/json" },
      });

      this.#logger.info("[+] message successfully sent");
    } catch (error: any) {
      this.#logger.error(`[-] Failed to Send Msg for >> ${error.message}`);
    }
  }
}

/**
 * *an Example Msg To send
 */
let msg: IDiscordMsg = {
  username: "Notify_Me",
  embeds: [
    {
      timestamp: new Date(),
      title: "New Product",
      type: "rich",
      description: "We found a new item to buy",
      url: "https://stackoverflow.com/questions/72075305/discord-bots-embed-size",
      thumbnail: {
        url: "https://assets.reedpopcdn.com/ps5-console.png/BROK/thumbnail/1200x900/quality/100/ps5-console.png",
        height: 200,
        width: 200,
      },
      fields: [
        {
          //website name
          name: "Filed One",
          // link to website
          value: "Value One",
          // just to make a vertical list keep it false
          inline: false,
        },
      ],
    },
  ],
};

let url =
  "https://discord.com/api/webhooks/1025055852547285023/n0R1LQ_tmmdK21wJE3tIRwzYLtBbBhzO39MM5gBjPkG8dfQYWiNMtUdtM4_G_BwKMJrX";
