import { Publishable } from "../shared/publishable";

export class RoadmapComment extends Publishable {
    roadmap:string = "";
    comment:string = "";
    updated:Date = new Date;
}