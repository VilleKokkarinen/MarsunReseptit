import { Injectable } from '@angular/core';
import { PublicUser } from '../components/shared/user';
import { Observable } from 'rxjs';
import PocketBase, { RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class PublicUserService {
  pb:PocketBase;
  collection:RecordService;

  constructor(
    private loader: LoadingSpinnerService
  ) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('public_users');

    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }

  get(id: string): Observable<PublicUser> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<PublicUser>(id, function(data){
          observer.next(data.record as PublicUser)
        })
      }catch(err){
        observer.error(err);
      }
    })
  }

  getOne(id: string): Promise<PublicUser>{
    return this.collection.getOne<PublicUser>(id);
  }

  create(user: PublicUser): Promise<PublicUser> {
    return this.collection.create<PublicUser>(user);
  }


  update(user: PublicUser): Promise<PublicUser> {
    return this.collection.update<PublicUser>(user.id, user);
  }

  delete(user: PublicUser): Promise<boolean> {
    return this.collection.delete(user.id);
  }
}