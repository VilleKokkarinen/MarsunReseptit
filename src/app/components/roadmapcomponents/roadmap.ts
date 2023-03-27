import { Publishable } from "../shared/publishable";


export class Roadmap extends Publishable{
  name:string = ""; // Found a bug... // here's a new idea...
  priority:number = 1; // low, mid, high, very high
  type:number = 1; // bug-report // idea // feature-request
  status:number = 1; // new // under work // done
  description:string = "";
}