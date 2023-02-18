import { Base } from "../shared/base";

export class Unit extends Base {
    ShortName?: string;
    
    BaseUnit?: Unit;
    BaseUnitMultiplier?: number;
}