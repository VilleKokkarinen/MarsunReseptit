import { Publishable } from "./publishable";

export class Theme extends Publishable{
  Name:string = "";
  Theme:{ [key: string]: string; } = {
    "--Primary_Border_Color":  "rgba(25, 25, 30)",
    "--Accent_Border_Color":  "rgba(160, 117, 0)",
  
    "--Header_Bg_Color": "rgba(39, 47, 56)",
    "--Sidebar_Bg_Color":  "rgba(35, 40, 45)", 
    "--Modal_Bg_Color":  "rgba(95, 95, 95)",
    "--Dropdown_Bg_Color":  "rgba(40, 45, 51)", 
    "--MainContent_Bg_Color":  "rgba(110, 110, 110)",
  
    "--PrimaryColor":  "rgba(35, 40, 45)", 
    "--ComplementColor":  "rgba(116, 99, 68)", 
    "--AccentColor":  "rgba(201, 178, 94)", 
    "--NeutralColor":  "rgba(75, 75, 75)",
  
    "--TextColor_Primary":  "rgba(221, 187, 92)",
    "--TextColor_Complement":  "rgba(255, 217, 112)",  
    "--TextColor_Accent":  "rgba(160, 117, 0)",
    "--TextColor_Accent_2":  "rgba(25, 25, 30)",
  
    "--DropShadow_Color":  "rgba(35, 35, 45, 0.9)",  
    "--DisabledElementColor":  "rgba(75, 75, 75)",
  
  
    "--TextColor_Selected":  "rgba(255, 217, 112)",
    "--TextColor_Selected_Shadow":  "rgba(0, 0, 0)",
    "--TextColor_Selected_Bg":  "rgba(157, 51, 9, 0.125)",
  };
}