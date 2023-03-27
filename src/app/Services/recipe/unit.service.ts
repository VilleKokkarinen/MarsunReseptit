import { Unit } from '../../components/recipecomponents/unit';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('units');
  }

  get(id: string): Observable<Unit> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<Unit>(id, function(data){
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
  getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<Unit>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<Unit>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<Unit>(page,perPage);
    }
  }

  create(item: Unit): Promise<Unit> {
    return this.collection.create<Unit>(item);
  }


  update(item: Unit): Promise<Unit> {
    return this.collection.update<Unit>(item.id, item);
  }

  delete(item: Unit): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}