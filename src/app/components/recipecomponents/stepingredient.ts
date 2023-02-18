import { MeasuringUnit } from "./measuringunit";
import { Base } from "../shared/base";
import { Ingredient } from "./ingredient";

export class StepIngredient extends Base{
    Ingredient?:Ingredient
    Amount?: number;
    MeasuringUnit?: MeasuringUnit;

    SubstituteIngredients?: StepIngredient[];
}