import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipecomponents/recipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore';

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

  get(id: string): Observable<Recipe|undefined> {
    const docs = this.db.doc<Recipe>('recipes/' + id);
    return docs.snapshotChanges()
    .pipe(
      map(changes => {
        const data = changes.payload.data();
        return data;
      }))
  }

  getTrending(){
    
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