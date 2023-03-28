import { Trending_Recipe } from 'src/app/components/recipecomponents/recipe';
import { Injectable } from '@angular/core';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class TrendingRecipeService {
  pb:PocketBase;
  collection:RecordService;

  constructor(private loader: LoadingSpinnerService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('trending_recipes');
    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }

  getList(page:number = 1, perPage:number = 10): Promise<ListResult<Trending_Recipe>> {
      return this.collection.getList<Trending_Recipe>(page,perPage);
  }
}