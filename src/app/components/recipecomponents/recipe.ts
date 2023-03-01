import { Step } from "./step";
import { Comment } from "./comment";
import { Publishable } from "./../shared/publishable";

export class Recipe extends Publishable {
    Name:string = "";
    Mode:string = "Simple"; // simple == only text, Advanced = use steps, ingredients etc..  
    Description?:string;

    Recipe?:string = this.Mode == "Simple" ? "<markdown text>" : undefined;

    Steps: Step[] = [];
    Comments?: Comment[];

    Thumbnail?:string;
    Categories?:string[];
    Tags?:string[];
    Likes?:string[];
 }