import { Trending_Recipe } from '../components/recipecomponents/recipe';
import { Injectable } from '@angular/core';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrendingRecipeService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('trending_recipes');
  }

  getList(page:number = 1, perPage:number = 10): Promise<ListResult<Trending_Recipe>> {
      return this.collection.getList<Trending_Recipe>(page,perPage);
  }
}