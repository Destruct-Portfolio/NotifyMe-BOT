import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import fs from "fs";

export class Ping {
  /**
   * @disc a list of websites and see if the Product is showing or not
   * @return _paylaod
   */

  private _client: Hero | null;

  private _payload: { foundItem: string[] };

  private _List: IwebList[];

  constructor(List: IwebList[]) {
    this._List = List;
    this._client = null;
    this._payload = { foundItem: [] };
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
    });
  }

  private async _starting() {
    for (var i = 0; i < this._List.length; i++) {
      this._client?.goto(this._List[i].website);
      fs.writeFileSync(`${i}.jpeg`, await this._client!.takeScreenshot());
      await this._client!.waitForLoad("DomContentLoaded");
      fs.writeFileSync(`${i}-1.jpeg`, await this._client!.takeScreenshot());

      let pannel = await this._client!.document.querySelector(
        this._List[i].selector
      );
      if (pannel === null) {
        this._payload.foundItem.push(this._List[i].website);
        console.log(`[+] Product Found on ${this._List[i].website}`);
      } else {
        console.log("Product Doesnt Exist");
      }
    }
  }

  public async _exec() {
    console.log("Starting mate");
    await this._setup();
    if (this._client !== null) {
      await this._starting();
      return this._payload;
    } else {
      console.log("[-] HERO failed to load");
    }
  }
}

interface IwebList {
  website: string;
  selector: string;
}
