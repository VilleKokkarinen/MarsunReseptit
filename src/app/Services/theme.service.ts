import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Theme } from '../components/shared/theme';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor( private db: AngularFirestore, @Inject(DOCUMENT) private document: Document) {
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
     

  loadTheme(theme:string){
    const head = this.document.getElementsByTagName('head')[0];
    const style = this.document.createElement('link');
    style.id = 'css-styling';
    style.rel = 'stylesheet';
    style.href = `${theme}`;
    head.appendChild(style);
  }
}