import { Base } from "../shared/base";
import { Instruction } from "./instruction";
import { StepIngredient } from "./stepingredient";

export class Step extends Base {
    SubSteps?: Step[];
    Ingredients: StepIngredient[] = [];
    Description?:string;

    Instructions:Instruction[] = [];
 }