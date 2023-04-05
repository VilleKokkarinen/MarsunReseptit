import { Publishable } from "../shared/publishable";

export class Theme extends Publishable{
  name:string = "Cappuccino";
  theme:{ [key: string]: string; } = {
  "--Accent_Bg_Color": "rgb(107,67,52)",
  "--Accent_Border_Color": "rgb(255,244,230)",
  "--Accent_Color": "rgb(133,93,64)",
  "--Accent_Text_Color": "rgb(211,167,129)",
  "--DropShadow_Color": "rgba(35, 35, 45, 0.9)",
  "--Primary_Bg_Color": "rgb(133,79,66)",
  "--Primary_Border_Color": "rgb(41,16,3)",
  "--Primary_Color": "rgb(72,36,34)",
  "--Primary_Text_Color": "rgb(238,227,213)",
  "--Selected_Text_Color": "rgba(255, 217, 112)",
  "--Selected_Text_Color_Bg": "rgba(157, 51, 9, 0.125)",
  "--Selected_Text_Color_Shadow": "rgba(0, 0, 0)"
  };
}