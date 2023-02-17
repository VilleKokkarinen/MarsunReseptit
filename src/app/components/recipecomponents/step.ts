import { Base } from "../shared/base";
import { Ingredient } from "./ingredient";

export class Step extends Base {
    SubSteps?: Step[];     
    Ingredients: Ingredient[] = [];
 }