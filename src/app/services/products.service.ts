import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { Product } from '../common/interfaces';
import { shareReplay, takeUntil, map, share } from 'rxjs/operators';
import { AngularFirestoreCollection, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from 'angularfire2/firestore';
import { FirebaseDataService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnDestroy {

  private itemCache: {[key: string]: Product} = {};
  public productsCollection: AngularFirestoreCollection<Product>;
  private itemQuery$: Observable<Product[]>;
  public items$: Observable<Product[]>;
  protected cartItemId = 3;
  protected destroy$: Subject<any> = new Subject();
  constructor(protected firestore: FirebaseDataService) {
    this.productsCollection = this.firestore.getCollection<Product>('products');
    this.getData().pipe(takeUntil(this.destroy$)).subscribe((data: Product[]) => {
      for (let i = 0; i < data.length; i++) {
        this.itemCache[data[i].name] = data[i];
      }
    });
  }

  getData(): Observable<Product[]> {
    if (!this.itemQuery$) {
      this.itemQuery$ = this.productsCollection.valueChanges().pipe(shareReplay(1));
    }
    return this.itemQuery$;
  }

  getProductByName(itemName: string): Observable<Product> {
    if (this.itemCache.hasOwnProperty(itemName)) {
      return from(new Promise<Product>((res, rej) => {
        res(this.itemCache[itemName]);
      }));
    } else {
      return this.firestore.getCollection<Product>('products', ref => ref.where('name', '==', itemName))
      .valueChanges().pipe(map(e => e[0]));
    }
  }

  getProductByRef(productRef: DocumentReference): Observable<Product> {
    if (this.itemCache.hasOwnProperty(productRef.id)) {
      return from(new Promise<Product>((res, rej) => {
        res(this.itemCache[productRef.id]);
      }));
    } else {
      return this.firestore.getCollection<Product>('products', ref => ref.where('id', '==', productRef.id))
      .valueChanges().pipe(map(e => e[0]));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get items(): Observable<Product[]> {
    if (!this.items$) {
      this.items$ = this.getData().pipe(shareReplay(1));
    }
    return this.items$;
  }
}
