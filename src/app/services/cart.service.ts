import { Injectable } from '@angular/core';
import { Product, CartEntry } from '../common/interfaces';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { FirebaseDataService } from '../firebase.service';
import { UserService } from '../authentication';
import { DocumentReference, QueryDocumentSnapshot, QuerySnapshot, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from '../common/interfaces';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  protected orderCache: Order;
  protected activeOrderId = '';
  protected collection: AngularFirestoreCollection<Order>;
  protected items$: BehaviorSubject<Order> = new BehaviorSubject(null);
  protected cartItemId = 3;
  protected currentUser: any;
  constructor(protected firestore: FirebaseDataService, protected userService: UserService, protected productService: ProductsService) {
    this.currentUser = this.userService.currentUser;
    this.collection = this.firestore.getCollection<Order>('orders',
    ref => ref.where('active', '==', true).where('user', '==', this.currentUser ? this.currentUser.token : null));
    this.collection.valueChanges().subscribe((data: Order[]) => {
      this.items$.next(data[0]);
      this.orderCache = data[0];
    });
  }

  public get items() {
    return this.items$;
  }

  public async placeOrder() {
    if (!this.activeOrderId) {
      await this.collection.ref.get().then((entry: QuerySnapshot<Product>) => {
        this.activeOrderId = entry.docs[0].id;
      });
    }
    this.collection.doc(this.activeOrderId).update({
      active: false,
      checkOut: true,
      orderDate: new Date()
    });
  }

  public async changeEntry(product: DocumentReference, quantity: number) {
    const targetIndex = this.orderCache.items.findIndex(e => e.product.path === product.path);
    if (targetIndex < 0) {
      return;
    }
    const targetItem = this.orderCache.items[targetIndex];
    const preQuantity = targetItem.quantity;
    if (quantity !== 0) {
      targetItem.quantity = quantity;
    } else {
      this.orderCache.items.splice(targetIndex, 1);
    }
    let productPrice: number;
    await this.productService.getProductByRef(product).toPromise().then((result) => {
      productPrice = result.price;
    });
    if (!this.activeOrderId) {
      await this.collection.ref.get().then((entry: QuerySnapshot<Product>) => {
        this.activeOrderId = entry.docs[0].id;
      });
    }
    this.orderCache.orderPrice += (quantity - preQuantity) * productPrice;
    this.orderCache.orderPrice = this.orderCache.items.length ? this.orderCache.orderPrice : 0;
    this.orderCache.orderPrice = parseFloat(this.orderCache.orderPrice.toFixed(2));
    this.collection.doc(this.activeOrderId).update({
      items: this.orderCache.items,
      orderPrice: this.orderCache.orderPrice
    });
  }

  /** Adds an entry to the cart by name of the product (ref to product table) + quantity for the user */
  public async addEntry(name: string): Promise<void> {
    let productRef: QueryDocumentSnapshot<Product>;
    // Get reference to product
    await this.firestore.getCollection<Product>('products').ref
    .where('name', '==', name).get()
    .then((entry: QuerySnapshot<Product>) => {
      productRef = entry.size ? entry.docs[0] : null;
    });
    let activeOrder: QueryDocumentSnapshot<Order>;

    // Get active orders for user
    await this.firestore.getCollection<Order>('orders').ref
    .where('user', '==', this.currentUser.token)
    .where('active', '==', true).get()
    .then((entry: QuerySnapshot<Order>) => {
      activeOrder = entry.size ? entry.docs[0] : null;
    });
    // If there is a current active order -> use that
    if (activeOrder) {
      this.activeOrderId = activeOrder.id;
      const currentData: Order = activeOrder.data();
      let items = [];
      if (currentData.items.find(e => e.product.path === productRef.ref.path)) {
        items = currentData.items.map((e) => {
          if (e.product.path === productRef.ref.path) {
            e.quantity++;
          }
          return e;
        });
      } else {
        items = [...currentData.items, {
          product: this.firestore.db.doc('products/' + productRef.id).ref,
          quantity: 1
        }];
      }
      return this.firestore.getCollection<Order>('orders').doc(this.activeOrderId).update({
        items,
        orderPrice: parseFloat((activeOrder.data().orderPrice + productRef.data().price).toFixed(2))
      });
    } else {
    // Create a new active order for the user
      const addItem: Order = {
        user: this.currentUser.token,
        active: true,
        checkOut: false,
        items: [{
          product: this.firestore.db.doc('products/' + productRef.id).ref,
          quantity: 1
        }],
        orderPrice: parseFloat((productRef.data().price).toFixed(2))
      };
      return this.firestore.getCollection<Order>('orders').add(addItem).then((entry: DocumentReference) => {
        this.activeOrderId = entry.id;
      });
    }
  }
}
