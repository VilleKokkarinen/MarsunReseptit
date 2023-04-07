import { Injectable } from '@angular/core';
import { UserRole } from 'src/app/components/shared/user';
import { Observable } from 'rxjs';
import PocketBase, { RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  pb:PocketBase;
  collection:RecordService;

  constructor(
    private loader: LoadingSpinnerService
  ) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.collection = this.pb.collection('user_role');

    this.collection.client.beforeSend = function (url, options) {
      loader.addRequest();
        return { url, options }
    };
    
    this.collection.client.afterSend = function (response, data) {
      loader.reduceRequest();
      return data;
    };
  }

  getOne(id: string): Promise<UserRole>{
    return this.collection.getOne<UserRole>(id);
  }

  create(user: UserRole): Promise<UserRole> {
    return this.collection.create<UserRole>(user);
  }

  update(user: UserRole): Promise<UserRole> {
    return this.collection.update<UserRole>(user.id, user);
  }

  delete(user: UserRole): Promise<boolean> {
    return this.collection.delete(user.id);
  }
}
