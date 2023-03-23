import { Publishable } from "./../shared/publishable";

export class Recipe extends Publishable {
    name:string = "";
    description:string = "";

    recipe:string = "";

    thumbnail?:string;
    categories?:string[];
    tags?:string[];
 }