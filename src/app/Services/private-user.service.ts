import { Injectable } from '@angular/core';
import { PrivateUser } from '../components/shared/user';
import { Observable } from 'rxjs';
import PocketBase, { RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class PrivateUserService {
  pb:PocketBase;
  collection:RecordService;

  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('users');
  }

  /*
  get(id: string): Observable<PrivateUser> {
    return new Observable((observer) => {
      try{
        this.collection.subscribe<PrivateUser>(id, function(data){
          observer.next(data.record as PrivateUser)
        })
      }catch(err){
        observer.error(err);
      }
    })
  }
  */

  getOne(id: string): Promise<PrivateUser>{
    return this.collection.getOne<PrivateUser>(id);
  }
  
/*
  create(user: PrivateUser): Promise<PrivateUser> {
    return this.collection.create<PrivateUser>(user);
  }


  update(user: PrivateUser): Promise<PrivateUser> {
    return this.collection.update<PrivateUser>(user.id, user);
  }

  delete(user: PrivateUser): Promise<boolean> {
    return this.collection.delete(user.id);
  }
  */
}