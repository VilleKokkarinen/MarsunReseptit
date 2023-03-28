import { ThemeTotalLikes } from '../../components/themecomponents/themelike';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeTotalLikesService {
  pb:PocketBase;
  collection:RecordService;

  constructor(private loader: LoadingSpinnerService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('theme_total_likes');
    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }
  
  getOne(id: string): Promise<ThemeTotalLikes>{
    return this.collection.getOne<ThemeTotalLikes>(id);
  }

  create(item: ThemeTotalLikes): Promise<ThemeTotalLikes> {
    return this.collection.create<ThemeTotalLikes>(item);
  }

  update(item: ThemeTotalLikes): Promise<ThemeTotalLikes> {
    return this.collection.update<ThemeTotalLikes>(item.id, item);
  }

  delete(item: ThemeTotalLikes): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}