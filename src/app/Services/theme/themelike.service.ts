import { ThemeLike } from 'src/app/components/themecomponents/themelike';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { PBAuthService } from '../pb.auth.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeLikeService {
  pb:PocketBase;
  collection:RecordService;

  constructor(private authService:PBAuthService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('theme_likes');
  }

  get(id: string): Observable<ThemeLike> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<ThemeLike>(id, function(data){
          observer.next(data.record)
        })
      }catch(err){
        observer.error(err);
      }
    })
  }

  HaveILikedThisTheme(theme:string): Promise<ThemeLike> {
    return new Promise((resolve,reject) => {
      this.collection.getFirstListItem<ThemeLike>(`theme='${theme}' && publisher='${this.authService.userData.id}'`).then((record)=>{
        resolve(record)
      },(err)=>{
        reject("Not Found")
      })
    })
  }

  getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<ThemeLike>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<ThemeLike>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<ThemeLike>(page,perPage);
    }
  }

  create(item: ThemeLike): Promise<ThemeLike> {
    return this.collection.create<ThemeLike>(item);
  }


  update(item: ThemeLike): Promise<ThemeLike> {
    return this.collection.update<ThemeLike>(item.id, item);
  }

  delete(item: ThemeLike): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}