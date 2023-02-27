import { Injectable } from '@angular/core';
import { PublicUser } from '../components/shared/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PublicUserService {
  constructor(
    private db: AngularFirestore
  ) { this.usersRef = db.collection(this.dbPath) }

  private dbPath = '/public-users';

  usersRef: AngularFirestoreCollection<PublicUser>;

  getAll(): AngularFirestoreCollection<PublicUser> {
    return this.usersRef;
  }

  get(id: string): Observable<PublicUser|undefined> {
    const docs = this.db.doc<PublicUser>('public-users/' + id);
    return docs.snapshotChanges()
    .pipe(
      map(changes => {
        const data = changes.payload.data();
        return data;
      }))
  }
  
  create(user: PublicUser): any {
    return this.usersRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }
     
}