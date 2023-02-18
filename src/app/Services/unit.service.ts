import { Injectable, NgZone } from '@angular/core';
import { Unit } from '../components/recipecomponents/unit';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(
    private db: AngularFirestore
  ) { this.unitRef = db.collection(this.dbPath) }

  private dbPath = '/measuring-units';

  unitRef: AngularFirestoreCollection<Unit>;

  getAll(): AngularFirestoreCollection<Unit> {
    return this.unitRef;
  }

  create(unit: Unit): any {
    return this.unitRef.add({ ...unit });
  }

  update(id: string, data: any): Promise<void> {
    return this.unitRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.unitRef.doc(id).delete();
  }
     
}