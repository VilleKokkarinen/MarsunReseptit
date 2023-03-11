import { Theme } from "./theme";

export class Settings{
    Show_Sidebar:Boolean = true;
    Show_Footer:Boolean = true;

    Language:string = "en";

    Theme:Theme = new Theme();

    User:string = "";
}