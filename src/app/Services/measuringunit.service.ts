import { Injectable } from '@angular/core';
import { MeasuringUnit } from '../components/recipecomponents/measuringunit';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MeasuringUnitService {
  constructor(
    private db: AngularFirestore
  ) { this.measuringUnitRef = db.collection(this.dbPath) }

  private dbPath = '/measuring-units';

  measuringUnitRef: AngularFirestoreCollection<MeasuringUnit>;

  getAll(): AngularFirestoreCollection<MeasuringUnit> {
    return this.measuringUnitRef;
  }

  create(measuringunit: MeasuringUnit): any {
    return this.measuringUnitRef.add({ ...measuringunit });
  }

  update(id: string, data: any): Promise<void> {
    return this.measuringUnitRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.measuringUnitRef.doc(id).delete();
  }
     
}