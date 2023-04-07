import { Injectable } from '@angular/core';
import { UserTier } from 'src/app/components/shared/user';
import { Observable } from 'rxjs';
import PocketBase, { RecordService } from "pocketbase";
import { environment } from 'src/environments/environment';
import { LoadingSpinnerService } from '../loading-spinner.service';


@Injectable({
  providedIn: 'root'
})
export class UserTierService {
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

  getOne(id: string): Promise<UserTier>{
    return this.collection.getOne<UserTier>(id);
  }

  create(user: UserTier): Promise<UserTier> {
    return this.collection.create<UserTier>(user);
  }

  update(user: UserTier): Promise<UserTier> {
    return this.collection.update<UserTier>(user.id, user);
  }

  delete(user: UserTier): Promise<boolean> {
    return this.collection.delete(user.id);
  }
}
