import { Injectable, NgZone } from '@angular/core';
import { Ingredient } from '../components/recipecomponents/ingredient';

import { AuthService } from './auth.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private db: AngularFirestore
  ) { this.ingredientRef = db.collection(this.dbPath) }

  private dbPath = '/ingredients';

  ingredientRef: AngularFirestoreCollection<Ingredient>;

  getAll(): AngularFirestoreCollection<Ingredient> {
    return this.ingredientRef;
  }

  create(ingredient: Ingredient): any {
    return this.ingredientRef.add({ ...ingredient });
  }

  update(id: string, data: any): Promise<void> {
    return this.ingredientRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.ingredientRef.doc(id).delete();
  }
     
}