import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipecomponents/recipe';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private db: AngularFirestore
  ) { this.recipesRef = db.collection(this.dbPath) }

  private dbPath = '/recipes';

  recipesRef: AngularFirestoreCollection<Recipe>;

  getAll(): AngularFirestoreCollection<Recipe> {
    return this.recipesRef;
  }

  create(recipe: Recipe): any {
    return this.recipesRef.add({ ...recipe });
  }

  update(id: string, data: any): Promise<void> {
    return this.recipesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.recipesRef.doc(id).delete();
  }
     
}