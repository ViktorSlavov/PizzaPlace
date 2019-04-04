import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, from, ReplaySubject, Subscription } from 'rxjs';
import { Product, ProductRef } from '../common/interfaces';
import { shareReplay, takeUntil, map, share, filter, take } from 'rxjs/operators';
import { AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import { FirebaseDataService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit, OnDestroy {

  protected dbSnapshot: any = null;
  protected productsCollection: AngularFirestoreCollection<Product>;
  protected dataSub: Subscription;
  protected itemsCache: Map<any, ProductRef> = new Map();
  public items = new ReplaySubject<ProductRef[]>(1);
  protected cartItemId = 3;
  protected destroy$: Subject<any> = new Subject();
  constructor(protected firestore: FirebaseDataService) {
    this.productsCollection = this.firestore.getCollection<Product>('products');
    this.getData();
  }

  getData(): void {
    if (!this.dataSub) {
      this.dataSub = this.productsCollection.snapshotChanges().pipe(shareReplay(1), takeUntil(this.destroy$)).subscribe((snapshot) => {
        snapshot.forEach((entry) => {
          const doc = entry.payload.doc;
          if (entry.type === 'added' || entry.type === 'modified') {
            this.itemsCache.set(doc.id, { ref: doc.ref, data: doc.data() });
          } else if (entry.type === 'removed') {
            this.itemsCache.delete(doc.id);
          }
        });
        const items = Array.from(this.itemsCache.values());
        this.items.next(items);
      });
    }
  }

  ngOnInit() {
  }

  getProduct(productID: any): ProductRef {
   return this.itemsCache.get(productID);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
