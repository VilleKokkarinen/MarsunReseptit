import { ThemeTotalLikes } from '../components/themecomponents/themelike';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeTotalLikesService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('theme_total_likes');
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