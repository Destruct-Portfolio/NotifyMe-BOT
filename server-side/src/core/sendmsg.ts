import axios from "axios";
import Locals from "../misc/locals";
import { IDiscordMsg } from "../types/embed";

/**
 * a class to consume the Discord Webhook
 */

class NotifyUser {
  private URL: string | null;
  public msg: any;

  /**
   * @param webhookurl the webhook url Provided by your Discord Channel
   * @param message the msg to send
   */

  constructor(webhookurl: string, msg: IDiscordMsg) {
    this.URL = webhookurl;
    this.msg = msg;
  }

  public async _Notify() {
    let send_msg = await axios.post(this.URL!, this.msg, {
      headers: { "content-type": "application/json" },
    });
    console.log(await send_msg);
  }
}

let msg: IDiscordMsg = {
  username: "Notify_Me",
  /*   content: "A new Product By The Name : NAME-HERE is in stock", */
  embeds: [
    {
      timestamp: new Date(),
      title: "New Product",
      type: "rich",
      description: "We found a new item to buy",
      url: "https://stackoverflow.com/questions/72075305/discord-bots-embed-size",
      thumbnail: {
        url: "https://miro.medium.com/max/1400/1*fO8gQGV9HVi7153Jvby2Xg.jpeg",
        height: 10000,
        width: 10000,
      },
      fields: [
        {
          name: "Filed One",
          value: "Value One",
          inline: false,
        },
        {
          name: "Filed One",
          value: "Value One",
          inline: false,
        },
        {
          name: "Filed One",
          value: "Value One",
          inline: false,
        },
      ],
    },
  ],
};

let url =
  "https://discord.com/api/webhooks/1025058438344085624/GDCac9gvjjdIyOM9hyMwdknyGbq_gsKLa79KY7Y4SQE30RsPbvW9XpMJQk6-1zzVBDGF";

console.log(await new NotifyUser(url, msg)._Notify());
