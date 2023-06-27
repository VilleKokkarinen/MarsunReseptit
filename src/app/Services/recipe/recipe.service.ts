import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  pb:PocketBase;
  collection:RecordService;

  constructor(private loader: LoadingSpinnerService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('recipes');
    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };

    this.collection.client.autoCancellation(false);
    }

  get(id: string): Observable<Recipe> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<Recipe>(id, function(data){
          observer.next(data.record)
        })
      }catch(err){
        observer.error(err);
      }
    })
  }

  getOne(id: string): Promise<Recipe>{
    return this.collection.getOne<Recipe>(id);
  }

  getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<Recipe>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<Recipe>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<Recipe>(page,perPage);
    }
  }

  create(item: Recipe): Promise<Recipe> {
    return this.collection.create<Recipe>(item);
  }


  update(item: Recipe): Promise<Recipe> {
    return this.collection.update<Recipe>(item.id, item);
  }

  delete(item: Recipe): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}