import { Injectable } from '@angular/core';
import { UserService, User } from '../authentication';
import { FirebaseDataService } from '../firebase.service';
import { UserInfo, Order } from '../common/interfaces';
import { from, Observable } from 'rxjs';
import { map, take, shareReplay } from 'rxjs/operators';
import { AngularFirestoreCollection, QuerySnapshot } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  protected currentDB: UserInfo;
  protected currentUser: User;
  protected userQuery: AngularFirestoreCollection<UserInfo>;
  protected ordersQuery: AngularFirestoreCollection<Order>;
  constructor(protected userService: UserService, protected firebase: FirebaseDataService) {
    if (this.userService.currentUser) {
      this.currentUser = this.userService.currentUser;
    }
    this.checkUser();
  }

  protected getUserByEmail(): AngularFirestoreCollection<UserInfo> {
    if (!this.userQuery) {
      this.userQuery = this.firebase.getCollection<UserInfo>('users',
        (ref) => ref.where('email', '==', this.currentUser.email));
    }
    return this.userQuery;
  }
  public getPastOrders(): Observable<Order[]> {
    if (!this.ordersQuery) {
      this.ordersQuery = this.firebase.getCollection<Order>('orders',
        ref => ref.where('user', '==', this.currentUser.token).where('active', '==', false).where('checkOut', '==', true));
    }
    return this.ordersQuery.valueChanges().pipe(shareReplay(1));
  }

  public updateUser(info) {
    this.getUserByEmail().get().pipe(take(1)).subscribe((data: QuerySnapshot<UserInfo>) => {
      this.getUserByEmail().doc(data.docs[0].id).update(info);
    });
  }
  protected registerCurrentUserInDB() {
    this.firebase.getCollection<UserInfo>('users').add({
      firstName: this.currentUser.given_name,
      lastName: this.currentUser.family_name,
      email: this.currentUser.email,
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
    const currentUser = this.userService.currentUser;
    if (!currentUser) {
      return from(new Promise<UserInfo>((res, rej) => res(null)));
    }
    return this.getUserByEmail()
      .valueChanges().pipe(map(response => response[0]), shareReplay(1));
  }
}
