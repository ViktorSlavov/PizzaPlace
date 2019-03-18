import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, Query } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


export enum DB_CRUD_OPERATION {
  DELETE = -1,
  CREATE = 1,
  UPDATE = 0
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  protected collections: {[key: string]: AngularFirestoreCollection<{}> } = {};
  protected fireDB: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;
  constructor(protected database: AngularFirestore) {
  }

  get db(): AngularFirestore {
    return this.database;
  }

  public getCollection<T>(name: string, queryColleciton?: (ref: any) => Query) {
    return this.collections[name] =
    this.database.collection(`/${name}` as any, queryColleciton ? queryColleciton : undefined) as AngularFirestoreCollection<T>;
  }

  public writeValues(collection: string, name: string, values: any): void {
    this.getCollection(collection).doc(name).set(values);
  }

  public deleteValues(collection: string, name: string) {
    this.getCollection(collection).doc(name).delete();
  }
}
