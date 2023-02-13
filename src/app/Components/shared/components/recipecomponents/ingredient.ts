import { MeasuringUnit } from "./unit";
import { Base } from "../shared/base";

export class Ingredient extends Base{
    Amount?: number;
    Unit?: MeasuringUnit;

    SubstituteIngredients?: Ingredient[];
}