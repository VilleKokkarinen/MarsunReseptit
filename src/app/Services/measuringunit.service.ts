import { Injectable, NgZone } from '@angular/core';
import { MeasuringUnit } from '../components/recipecomponents/measuringunit';

import { AuthService } from './auth.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MeasuringUnitService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
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