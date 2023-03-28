import { RecipeLike } from 'src/app/components/recipecomponents/recipelike';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { PBAuthService } from '../pb.auth.service';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeLikeService {
  pb:PocketBase;
  collection:RecordService;

  constructor(
    private loader: LoadingSpinnerService,
    private authService:PBAuthService
  ) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('recipe_likes');
    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }

  HaveILikedThisRecipe(recipe:string): Promise<RecipeLike> {
    return new Promise((resolve,reject) => {
      this.collection.getFirstListItem<RecipeLike>(`recipe='${recipe}' && publisher='${this.authService.userData.id}'`).then((record)=>{
        resolve(record)
      },(err)=>{
        reject("Not Found")
      })
    })
  }

  create(item: RecipeLike): Promise<RecipeLike> {
    item.recipepublisher = item.recipe + this.authService.userData.id;
    return this.collection.create<RecipeLike>(item);
  }

  delete(item: RecipeLike): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}