import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import fs from "fs";
import Logger from "../misc/logger.js";

export class Market {
  private _client: Hero | null;
  private _source: string;
  #logger: Logger;
  private _payload: string | null;

  constructor() {
    this._client = null;
    this.#logger = new Logger("Marker", "Market");
    this._source =
      "https://themarket.com/nz/p/ps5-playstation-5-console-strictly-1-unit-per-customer/2-R2695122";

    this._payload = null;
  }

  private async _setup() {
    const server = new Server();

    server.listen({ port: 3001 });

    this._client = new Hero({
      connectionToCore: {
        host: `ws://localhost:3001`,
      },
    });

    this._client.on("close", () => {
      this._client?.close();
      server.close();
    });
  }

  private async _cleanup() {
    this.#logger.info("[-] Session Clossing Running The Clean UP");
    this._client!.close();
  }

  private async _CheckProduct() {
    await this._client!.goto(this._source);
    await this._client!.waitForLoad("PaintingStable");
    await this._client!.waitForMillis(15000);
    fs.writeFileSync("30.jpeg", await this._client!.takeScreenshot());
    let t = await this._client!.document.querySelector(
      "div.alert.ui-alert.alert-warning.pdp-alert"
    );
    if (t !== null) {
      let innerText = await t.innerText;
      if (innerText === "This product is no longer available") {
        this.#logger.info(`[-] item is not avaliabale in ${this._source}`);
        this._payload = null;
      } else {
        this.#logger.info(`[+] found the item in ${this.#logger}`);
        this._payload = this._source;
      }
    } else {
      this._payload = null;
    }
  }

  public async _exec() {
    await this._setup();
    if (this._client !== null) {
      let t = await this._CheckProduct();
      await this._cleanup();
      return this._payload;
    } else {
      this.#logger.error("[-] Hero Failed To lunch");
    }
  }
}
