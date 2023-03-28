import { Publishable } from "../shared/publishable";

export class ThemeLike extends Publishable {
    theme:string = "";
    themepublisher:string="";
}

export class ThemeTotalLikes {
    id:string = "";
    likes:number = 0;
}