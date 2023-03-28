import { Publishable } from "../shared/publishable";

export class RecipeLike extends Publishable {
    recipe:string = "";
    recipepublisher:string="";
}

export class RecipeTotalLikes {
    id:string = "";
    likes:number = 0;
}