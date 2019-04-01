import { Injectable } from '@angular/core';
import { UserService, User } from '../authentication';
import { FirebaseDataService } from '../firebase.service';
import { UserInfo } from '../common/interfaces';
import { from, Observable } from 'rxjs';
import { map, take, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  protected currentDB: UserInfo;
  protected currentUser: User;
  constructor(protected userService: UserService, protected firebase: FirebaseDataService) {
    if (this.userService.currentUser) {
      this.currentUser = this.userService.currentUser;
    }
    this.checkUser();
  }

  protected registerCurrentUserInDB() {
    this.firebase.getCollection<any>('users').add({
      first_name: this.currentUser.given_name,
      last_name: this.currentUser.family_name,
      email: this.currentUser.email
    });
  }

  public get user(): UserInfo {
    return this.currentDB ? Object.assign({} , this.currentDB) : null; 
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
  public getUser():  Observable<UserInfo> {
    const currentUser = this.userService.currentUser;
    if (!currentUser) {
      return from(new Promise<UserInfo>((res, rej) => res(null)));
    }
    return this.firebase.getCollection<UserInfo>('users',
    (ref) => ref.where('email', '==', currentUser.email))
    .valueChanges().pipe(map(response => response[0]), shareReplay(1));
  }
}
