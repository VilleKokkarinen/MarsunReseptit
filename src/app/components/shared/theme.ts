import { Publishable } from "./publishable";

export class ThemeObject{
  "--Primary_Border_Color": string = "rgba(25, 25, 30)";
  "--Accent_Border_Color": string = "rgba(160, 117, 0)";

  "--Header_Bg_Color":string = "rgba(39, 47, 56)";
  "--Sidebar_Bg_Color": string = "rgba(35, 40, 45)"; 
  "--Modal_Bg_Color": string  = "rgba(95, 95, 95)";
  "--Dropdown_Bg_Color": string = "rgba(40, 45, 51)"; 
  "--MainContent_Bg_Color": string  = "rgba(110, 110, 110)";

  "--PrimaryColor": string  = "rgba(35, 40, 45)"; 
  "--ComplementColor": string = "rgba(116, 99, 68)"; 
  "--AccentColor": string = "rgba(201, 178, 94)"; 
  "--NeutralColor": string  = "rgba(75, 75, 75)";

  "--TextColor_Primary": string  = "rgba(221, 187, 92)";
  "--TextColor_Complement": string  = "rgba(255, 217, 112)";  
  "--TextColor_Accent": string  = "rgba(160, 117, 0)";
  "--TextColor_Accent_2": string  = "rgba(25, 25, 30)";

  "--DropShadow_Color": string  = "rgba(35, 35, 45, 0.9)";  
  "--DisabledElementColor": string = "rgba(75, 75, 75)";


  "--TextColor_Selected": string = "rgba(255, 217, 112)";
  "--TextColor_Selected_Shadow": string = "rgba(0, 0, 0)";
  "--TextColor_Selected_Bg": string = "rgba(157, 51, 9, 0.125)";
}

export class Theme extends Publishable{
  Name:string = "";
  Theme?:ThemeObject;
}