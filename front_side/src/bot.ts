import "reflect-metadata";

import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";

import { IntentsBitField } from "discord.js";
import type { Interaction, Message } from "discord.js";

export default class Bot {
  private _id: string;
  private _client: Client;

  constructor(__id: string) {
    this._id = __id;

    this._client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
      ],
      silent: false,
    });
  }

  /**
   * run
   */
  public async run() {
    this._client.on("ready", async () => {
      console.log(">> Bot started");

      // to create/update/delete discord application commands
      await this._client.initApplicationCommands();
    });

    this._client.on("interactionCreate", (interaction: Interaction) => {
      this._client.executeInteraction(interaction);
    });

    this._client.on("messageCreate", (message: Message) => {
      this._client.executeCommand(message);
    });

    /**
     * @description Cogs Mechanism
     */
    await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");

    this._client.login(this._id);
  }
}
