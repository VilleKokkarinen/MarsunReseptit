import { MeasuringUnit } from "../measuringunit/measuringunit";
import { Base } from "../../shared/base";

export class Ingredient extends Base{
    Amount?: number;
    Unit?: MeasuringUnit;

    SubstituteIngredients?: Ingredient[];
}