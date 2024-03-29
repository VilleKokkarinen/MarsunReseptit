import { RoadmapComment } from 'src/app/components/roadmapcomponents/roadmapcomment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PocketBase, { ListResult, RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class RoadmapCommentService {
  pb:PocketBase;
  collection:RecordService;

  constructor(private loader: LoadingSpinnerService) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('roadmap_comments');
    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }

  getList(page:number = 1, perPage:number = 5, filter: string|undefined): Promise<ListResult<RoadmapComment>> {
    if(filter != undefined && filter != ""){
      return this.collection.getList<RoadmapComment>(page,perPage,{
        filter: filter //'created >= "2022-01-01 00:00:00" && someField1 != someField2'
    });
    }else{
      return this.collection.getList<RoadmapComment>(page,perPage);
    }
  }

  create(item: RoadmapComment): Promise<RoadmapComment> {
    return this.collection.create<RoadmapComment>(item);
  }


  update(item: RoadmapComment): Promise<RoadmapComment> {
    return this.collection.update<RoadmapComment>(item.id, item);
  }

  delete(item: RoadmapComment): Promise<boolean> {
    return this.collection.delete(item.id);
  } 
}