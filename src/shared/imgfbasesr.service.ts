import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ImgfbasesrService {

  constructor(private db: AngularFireDatabase) { }

  
}
function doc(db: AngularFireDatabase, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}

function getDoc(docRef: void) {
  throw new Error('Function not implemented.');
}

function orderBy(arg0: string): any {
  throw new Error('Function not implemented.');
}

function query(arg0: AngularFireList<unknown>, arg1: any, arg2: any) {
  throw new Error('Function not implemented.');
}

function collection(arg0: string, arg1: (ref: any) => any) {
  throw new Error('Function not implemented.');
}

