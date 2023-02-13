import { Step } from "../step";
import { Comment } from "../comment";
import { Base } from "../../shared/base";
import { Publishable } from "../../shared/publishable";

export class Recipe extends Publishable {
    Name:string = "";
    Steps: Step[] = [];
    Comments?: Comment[];
 }