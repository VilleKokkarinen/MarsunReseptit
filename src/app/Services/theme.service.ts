import { Injectable } from '@angular/core';

import { Theme } from '../components/shared/theme';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor( private db: AngularFirestore) {
    this.themesRef = db.collection(this.dbPath)
  }  
  private dbPath = '/themes';

  themesRef: AngularFirestoreCollection<Theme>;

  getAll(): AngularFirestoreCollection<Theme> {
    return this.themesRef;
  }

  create(theme: Theme): any {
    return this.themesRef.add({ ...theme });
  }

  update(id: string, data: any): Promise<void> {
    return this.themesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.themesRef.doc(id).delete();
  }
     

  applyTheme(Theme:Theme){
    for (const [k, v] of Object.entries(Theme.Theme)) {
      document.documentElement.style.setProperty(k, v);
    }
  }

}