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
  
    "--Primary_Color":  "rgba(35, 40, 45)", 
    "--Complement_Color":  "rgba(116, 99, 68)", 
    "--Accent_Color":  "rgba(201, 178, 94)", 
    "--Neutral_Color":  "rgba(75, 75, 75)",
  
    "--Primary_Text_Color":  "rgba(221, 187, 92)",
    "--Complement_Text_Color":  "rgba(255, 217, 112)",  
    "--Accent_Text_Color":  "rgba(160, 117, 0)",
    "--Secondary_Accent_Text_Color":  "rgba(25, 25, 30)",
  
    "--DropShadow_Color":  "rgba(35, 35, 45, 0.9)",  
    "--Disabled_Element_Color":  "rgba(75, 75, 75)",
  
  
    "--Selected_Text_Color":  "rgba(255, 217, 112)",
    "--Selected_Text_Color_Shadow":  "rgba(0, 0, 0)",
    "--Selected_Text_Color_Bg":  "rgba(157, 51, 9, 0.125)",
  };
}