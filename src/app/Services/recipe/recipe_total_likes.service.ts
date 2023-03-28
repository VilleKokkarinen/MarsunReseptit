import { RecipeTotalLikes } from '../../components/recipecomponents/recipelike';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeTotalLikesService {
  pb:PocketBase;
  collection:RecordService;

  constructor(private loader: LoadingSpinnerService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('recipe_total_likes');
    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }
  
  getOne(id: string): Promise<RecipeTotalLikes>{
    return this.collection.getOne<RecipeTotalLikes>(id);
  }

  create(item: RecipeTotalLikes): Promise<RecipeTotalLikes> {
    return this.collection.create<RecipeTotalLikes>(item);
  }

  update(item: RecipeTotalLikes): Promise<RecipeTotalLikes> {
    return this.collection.update<RecipeTotalLikes>(item.id, item);
  }

  delete(item: RecipeTotalLikes): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}