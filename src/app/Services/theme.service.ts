import { Theme } from '../components/themecomponents/theme';
import { SettingsService } from './settings.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  pb:PocketBase;
  collection:RecordService;

  currentlyTestingTheme:boolean = false;

  constructor(private settingsService:SettingsService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('themes');

    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.applyTheme(newSettings.Theme)
    })
  }

  applyTheme(Theme:Theme){
    for (const [k, v] of Object.entries(Theme.theme)) {
      document.documentElement.style.setProperty(k, v);
    }
  }

  testTheme(Theme:Theme){
    if(this.currentlyTestingTheme === false && Theme.id != this.settingsService.Settings.Theme.id){
      this.currentlyTestingTheme = true;
      this.applyTheme(Theme);
      setTimeout(() => {
        this.applyTheme(this.settingsService.Settings.Theme);
        this.currentlyTestingTheme = false;
      }, 3500);
    }
  }

  get(id: string): Observable<Theme> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<Theme>(id, function(data){
          observer.next(data.record)
        })
      }catch(err){
        observer.error(err);
      }
    })
  }

  getOne(id: string): Promise<Theme>{
    return this.collection.getOne<Theme>(id);
  }

  getList(page:number = 1, perPage:number = 10, filter: string|undefined): Promise<ListResult<Theme>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<Theme>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<Theme>(page,perPage);
    }
  }

  create(item: Theme): Promise<Theme> {
    return this.collection.create<Theme>(item);
  }


  update(item: Theme): Promise<Theme> {
    return this.collection.update<Theme>(item.id, item);
  }

  delete(item: Theme): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}