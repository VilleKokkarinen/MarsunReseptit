import { Ingredient } from '../components/recipecomponents/ingredient';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('ingredients');
  }

  get(id: string): Observable<Ingredient> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<Ingredient>(id, function(data){
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
  getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<Ingredient>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<Ingredient>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<Ingredient>(page,perPage);
    }
  }

  create(item: Ingredient): Promise<Ingredient> {
    return this.collection.create<Ingredient>(item);
  }


  update(item: Ingredient): Promise<Ingredient> {
    return this.collection.update<Ingredient>(item.id, item);
  }

  delete(item: Ingredient): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}