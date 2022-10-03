import Hero from "@ulixee/hero";

import fs from "fs";

import Server from "@ulixee/server";

import Logger from "../misc/logger.js";

import pkg from "lodash";

const { differenceBy } = pkg;

/**
 * *goes to the source takes a snapshot and compares it to the old snapshat
 * TODO add an other virification Logic using the keywords
 * TODO need to change the return value of the payload
 * @return N/A incase of failure and boolean
 */
export class Snap {
  private _client: Hero | null;

  private _payload: {
    present: "N/A" | boolean;
  };

  #logger: Logger;

  private _source: string;

  /**
   * Temporary Holder for the new data
   */
  private _newData: {
    name: string;

    url: string;
  }[];

  constructor() {
    this._client = null;

    this._payload = {
      present: "N/A",
    };

    this._source =
      "https://store.sony.co.nz/playstation-5-console/PLAYSTATION5WD.html";

    this.#logger = new Logger("Snap", "Snap");

    this._newData = [];
  }
  private async setup() {
    this.#logger.info(`[+] Starting a snap Session at ${new Date().getTime()}`);

    const server = new Server();

    server.listen({ port: 3001 });

    this._client = new Hero({
      connectionToCore: {
        host: `ws://localhost:3001`,
      },
    });

    this._client.on("close", () => {
      server.close();
    });

    return this;
  }

  private async CompareData() {
    this.#logger.info("[+] Loading old snpashot of the website");

    let oldSnap = fs.readFileSync("../../temp/snap.json");

    let old = JSON.parse(oldSnap);

    this.#logger.info("[+] Comparing the snapshots");

    const res = differenceBy(this._newData, old, "name");

    if (res.length > 0) {
      this.#logger.info(`[+] Found new item`);

      console.log(res);

      fs.writeFileSync("../../temp/snap.json", JSON.stringify(this._newData));

      /**
       * We need TO Do an Other check For key words here cz its too vage
       */
      this._payload.present = true;
    } else {
      this._payload.present = false;

      this.#logger.info("[+] No New Item");
    }
  }
  private async _cleanUp() {
    this.#logger.info("[+] starting the Clean up Process");

    await this._client!.close();
  }

  private async ScrapeData() {
    await this._client!.goto(this._source);

    await this._client!.waitForLoad("AllContentLoaded");

    fs.writeFileSync(`snap.jpeg`, await this._client!.takeScreenshot());

    let H2 = await this._client!.document.querySelectorAll(
      "div.product-container > div.product-name.ellipse > h2"
    ).$map(async (item) => {
      this._newData.push({
        name: await item.innerText,
        url: await item.querySelector("a").href,
      });
    });

    this.#logger.info(`[+] ${this._newData.length} items collected succefully`);
  }

  public async _exec() {
    await this.setup();

    if (this._client !== null) {
      this.#logger.error(`[-] Hero succesfull Lunch for ${this._source}`);
      try {
        await this.ScrapeData();

        await this.CompareData();
      } catch (error: any) {
        this._payload.present = "N/A";

        this.#logger.error(`[-] ${error.message}`);
      }
      return this._payload;
    } else {
      this.#logger.error(`[-] Hero Failed To Lunch at ${new Date().getDate()}`);
    }
  }
}

console.log(await new Snap()._exec());
