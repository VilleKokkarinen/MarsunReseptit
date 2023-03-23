import { Publishable } from "../shared/publishable";

export class RecipeComment extends Publishable {
    recipe:string = "";
    comment:string = "";
    updated:Date = new Date;
}