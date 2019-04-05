import { Injectable, OnDestroy } from '@angular/core';
import { UserService, User } from '../authentication';
import { FirebaseDataService } from '../firebase.service';
import { UserInfo, Order } from '../common/interfaces';
import { from, Observable, ReplaySubject, Subscription, Subject } from 'rxjs';
import { map, take, shareReplay, takeUntil } from 'rxjs/operators';
import { AngularFirestoreCollection, QuerySnapshot } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy {

  protected currentDB: UserInfo;
  protected _currentUser: User;
  public currentUser = new ReplaySubject<User>(1);
  protected userQuery: AngularFirestoreCollection<UserInfo>;
  protected destroy$ = new Subject();
  protected _orderSub: Subscription;
  protected _pastOrders = new ReplaySubject<Order[]>(1);
  constructor(protected userService: UserService, protected firebase: FirebaseDataService) {
    if (this.userService.currentUser) {
      this._currentUser = this.userService.currentUser;
      this.currentUser.next(this._currentUser);
    }
    this.checkUser();
  }

  public get pastOrders(): ReplaySubject<Order[]> {
    if (!this._orderSub) {
      this.getPastOrder();
    }
    return this._pastOrders;
  }

  protected getPastOrder() {
    this._orderSub = this.firebase.getCollection<Order>('orders', ref => ref.where('active', '==', false).where('checkOut', '==', true))
      .valueChanges().pipe(takeUntil(this.destroy$)).subscribe(orders => {
        this._pastOrders.next(orders);
      });
  }

  protected getUserByEmail(): AngularFirestoreCollection<UserInfo> {
    if (!this.userQuery) {
      this.userQuery = this.firebase.getCollection<UserInfo>('users',
        (ref) => ref.where('email', '==', this._currentUser.email));
    }
    return this.userQuery;
  }

  public updateUser(info) {
    this.getUserByEmail().get().pipe(take(1)).subscribe((data: QuerySnapshot<UserInfo>) => {
      this.userQuery.doc(data.docs[0].id).update(info);
    });
  }
  protected registerCurrentUserInDB() {
    this.firebase.getCollection<UserInfo>('users').add({
      firstName: this._currentUser.given_name,
      lastName: this._currentUser.family_name,
      email: this._currentUser.email,
      phone: '',
    });
  }

  public get user(): UserInfo {
    return this.currentDB ? Object.assign({}, this.currentDB) : null;
  }

  protected checkUser() {
    this.getUser().pipe(take(1)).subscribe((response: UserInfo) => {
      if (!response) {
        this.registerCurrentUserInDB();
      } else {
        this.currentDB = response;
      }
    });
  }
  public getUser(): Observable<UserInfo> {
    if (!this.currentUser) {
      return from(new Promise<UserInfo>((res, rej) => res(null)));
    }
    return this.getUserByEmail()
      .valueChanges().pipe(map(response => response[0]), shareReplay(1));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
