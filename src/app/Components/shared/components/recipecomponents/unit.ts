import { Base } from "../shared/base";

export class MeasuringUnit extends Base {
    ShortName?: string;
    
    BaseUnit?: MeasuringUnit;
    BaseUnitMultiplier?: number;
}