import { MeasuringUnit } from '../components/recipecomponents/measuringunit';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeasuringUnitService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('measuring_units');
  }

  get(id: string): Observable<MeasuringUnit> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<MeasuringUnit>(id, function(data){
          observer.next(data.record)
        })
      }catch(err){
        observer.error(err);
      }
    })
  }


/**
result:
"page": 1,
"perPage": 10,
"totalItems": 2,
"items": []
*/
  getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<MeasuringUnit>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<MeasuringUnit>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<MeasuringUnit>(page,perPage);
    }
  }

  create(item: MeasuringUnit): Promise<MeasuringUnit> {
    return this.collection.create<MeasuringUnit>(item);
  }


  update(item: MeasuringUnit): Promise<MeasuringUnit> {
    return this.collection.update<MeasuringUnit>(item.id, item);
  }

  delete(item: MeasuringUnit): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}