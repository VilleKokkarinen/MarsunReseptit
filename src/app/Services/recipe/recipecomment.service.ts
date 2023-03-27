import { RecipeComment } from 'src/app/components/recipecomponents/recipecomment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeCommentService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('recipe_comments');
  }

  getList(page:number = 1, perPage:number = 5, filter: string|undefined): Promise<ListResult<RecipeComment>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<RecipeComment>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<RecipeComment>(page,perPage);
    }
  }

  create(item: RecipeComment): Promise<RecipeComment> {
    return this.collection.create<RecipeComment>(item);
  }


  update(item: RecipeComment): Promise<RecipeComment> {
    return this.collection.update<RecipeComment>(item.id, item);
  }

  delete(item: RecipeComment): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}