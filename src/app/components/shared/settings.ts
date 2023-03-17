import { CookieSettings } from "./cookie-settings";
import { Theme } from "./theme";

export class Settings{
    Show_Sidebar:Boolean = true;
    Show_Footer:Boolean = true;

    Language:{key:string,value:string} = { 
        key:"English",
        value:"en"
    };

    Theme:Theme = new Theme();

    User:string = "";

    CookieSettings:CookieSettings = new CookieSettings();
}