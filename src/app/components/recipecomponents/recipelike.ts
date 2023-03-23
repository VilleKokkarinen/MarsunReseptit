import { Publishable } from "../shared/publishable";

export class RecipeLike extends Publishable {
    recipe:string = "";
}

export class RecipeTotalLikes {
    id:string = "";
    likes:number = 0;
}