import { Injectable } from '@angular/core';
import { ProductRef } from '../common/interfaces';
import { BehaviorSubject, Subscription, ReplaySubject, Subject } from 'rxjs';
import { FirebaseDataService } from '../firebase.service';
import { UserService } from '../authentication';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from '../common/interfaces';
import { ProductsService } from './products.service';
import { takeUntil, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  protected orderCache: Order;
  protected dataSub: Subscription;
  public order = new ReplaySubject<Order>(1);
  protected _activeOrderId = '';
  protected collection: AngularFirestoreCollection<Order>;
  protected items$: BehaviorSubject<Order> = new BehaviorSubject(null);
  protected currentUser: any;
  protected destroy$ = new Subject<any>();
  constructor(protected firestore: FirebaseDataService, protected userService: UserService, protected productService: ProductsService) {
    this.currentUser = this.userService.currentUser;
    this.collection = this.firestore.getCollection<Order>('orders',
    ref => ref.where('active', '==', true).where('user', '==', this.currentUser.token));
    this.collection.get().pipe(take(1)).subscribe(snapshot => {
      this._activeOrderId = snapshot.docs[0] ? snapshot.docs[0].id : null;
    });
    this.getData();
  }

  public getData() {
    if (!this.dataSub) {
      this.dataSub = this.collection.valueChanges().pipe(map(entry => entry[0]), takeUntil(this.destroy$)).subscribe(data => {
        if (data === undefined) {
          this.orderCache = {
            active: true,
            checkOut: false,
            items: [],
            user: this.currentUser.token,
            orderPrice: 0,
            orderDate: new Date()
          };
        } else {
          this.orderCache = data;
        }
        this.order.next(this.orderCache);
      });
    }
  }

  public get activeOrderId(): string {
    if (!this._activeOrderId) {
      this._activeOrderId = this.collection.ref.doc().id;
      this.collection.ref.doc(this._activeOrderId).set(this.orderCache);
    }
    return this._activeOrderId;
  }

  protected updateOrder() {
    if (this.orderCache.items.length === 0) {
      this.collection.doc(this.activeOrderId).delete();
    } else {
      this.orderCache.orderPrice = parseFloat(this.orderCache.orderPrice.toFixed(2));
      this.collection.doc(this.activeOrderId).update(this.orderCache);
    }
  }

  protected changeItem(product: ProductRef, quantity: number, entry?: { product: firebase.firestore.DocumentReference; quantity: number}) {
    let entryQuantity: number;
    entry = entry || this.orderCache.items.find(e => e.product.id === product.ref.id);
    if (entry) {
      if (quantity === 0) {
        this.orderCache.items.splice(this.orderCache.items.findIndex(e => e === entry), 1);
      }
      entryQuantity = entry.quantity;
      entry.quantity = quantity;
    } else {
      this.orderCache.items.push({
        product: product.ref,
        quantity: quantity
      });
      entryQuantity = 0;
    }
    this.orderCache.orderPrice += product.data.price * (quantity - entryQuantity);
  }

  public addItem(productID: string) {
    const product = this.productService.getProduct(productID);
    const currentEntry = this.orderCache.items.find(e => e.product.id === productID);
    let targetQuantity = 0;
    if (currentEntry) {
      targetQuantity = currentEntry.quantity + 1;
    } else {
      targetQuantity = 1;
    }
    this.changeItem(product, targetQuantity, currentEntry);
    this.updateOrder();
  }

  public removeItem(productID: string) {
    const product = this.productService.getProduct(productID);
    const currentEntry = this.orderCache.items.find(e => e.product.id === productID);
    let targetQuantity = 0;
    if (currentEntry) {
      if (currentEntry.quantity > 1) {
        targetQuantity = currentEntry.quantity - 1;
      }
    } else {
      return;
    }
    this.changeItem(product, targetQuantity, currentEntry);
    this.updateOrder();
  }

  public deleteItem(productID: string) {
    const product = this.productService.getProduct(productID);
    const currentEntry = this.orderCache.items.find(e => e.product.id === productID);
    this.changeItem(product, 0, currentEntry);
    this.updateOrder();
  }

  public replaceOrder(order: Order) {
    order.items.forEach((entry) => {
      const product = this.productService.getProduct(entry.product.id);
      this.changeItem(product, entry.quantity);
    });
    this.updateOrder();
  }

  public placeOrder() {
    this.orderCache.checkOut = true;
    this.orderCache.active = false;
    this.orderCache.orderDate = new Date();
    this.updateOrder();
  }
}
