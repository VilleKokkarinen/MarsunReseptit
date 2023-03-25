import { Publishable } from "./../shared/publishable";

export class Recipe extends Publishable {
    name:string = "";
    description:string = "";

    recipe:string = "";

    thumbnail?:string;
    categories?:string[];
    tags?:string[];
 }

 export class Trending_Recipe {
    name:string = "";
    id:string = "";
    thumbnail:string = "";
    likes:number = 0;
 }