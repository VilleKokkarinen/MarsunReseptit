import { Roadmap } from '../../components/roadmapcomponents/roadmap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  public static Priorities:{key:number,value:string}[] = [
    {
      key:1,
      value:"TXT_Low"
    },
    {
      key:2,
      value:"TXT_Medium"
    },
    {
      key:3,
      value:"TXT_High"
    },
    {
      key:4,
      value:"TXT_Very_High"
    }
 ];

 public static Types:{key:number,value:string}[] = [
  {
    key:1,
    value:"TXT_Idea"
  },
  {
    key:2,
    value:"TXT_Feature_Request"
  },
  {
    key:3,
    value:"TXT_Other"
  },
  {
    key:4,
    value:"TXT_Bug_Report"
  },
  {
    key:5,
    value:"TXT_Security"
  }
];

public static Statuses:{key:number,value:string}[] = [
  {
    key:1,
    value:"TXT_New"
  },
  {
    key:2,
    value:"TXT_Backlogged"
  },
  {
    key:3,
    value:"TXT_In_Development"
  },
  {
    key:4,
    value:"TXT_Done"
  }
];

pb:PocketBase;
collection:RecordService;

constructor(private loader: LoadingSpinnerService) {
  this.pb = new PocketBase(environment.pocketbaseUrl);
  this.collection = this.pb.collection('roadmaps');
  this.collection.client.beforeSend = function (url, options) {
    loader.addRequest();
      return { url, options }
  };
  
  this.collection.client.afterSend = function (response, data) {
    loader.reduceRequest();
    return data;
  };
}

get(id: string): Observable<Roadmap> {
  return new Observable((observer) => {
    try{
      this.collection.subscribe<Roadmap>(id, function(data){
        observer.next(data.record)
      })
    }catch(err){
      observer.error(err);
    }
  })
}

getOne(id: string): Promise<Roadmap>{
  return this.collection.getOne<Roadmap>(id);
}

getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<Roadmap>> {
  if(filter != undefined && filter != ""){
    return this.collection.getList<Roadmap>(page,perPage,{
      filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
  });
  }else{
    return this.collection.getList<Roadmap>(page,perPage);
  }
}

create(item: Roadmap): Promise<Roadmap> {
  return this.collection.create<Roadmap>(item);
}


update(item: Roadmap): Promise<Roadmap> {
  return this.collection.update<Roadmap>(item.id, item);
}

delete(item: Roadmap): Promise<boolean> {
  return this.collection.delete(item.id);
} 
}
