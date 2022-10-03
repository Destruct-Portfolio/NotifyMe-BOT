export interface IDiscordMsg {
  username: string;
  //  content: string;
  embeds: Idiscord_embeds[];
}
interface Idiscord_embeds {
  title: string;
  type: "rich";
  description: string;
  url: string;
  timestamp: Date;
  thumbnail: Iembed_thumbnail;
  fields: Iembed_field[];
}
interface Iembed_thumbnail {
  url: string;
  height: number;
  width: number;
}

interface Iembed_field {
  name: string;
  value: string;
  inline: boolean;
}
export interface Ilocals {
  PORT: number;
  HOST: string;
  API_Prefix: string;
  DC_WebHook: string;
}
export interface IwebList {
  website: string;
  selector: string;
}
