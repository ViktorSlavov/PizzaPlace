import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import { UserService } from '../services/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { IgxDropDownComponent, ISelectionEventArgs } from 'igniteui-angular';
import { ExternalAuthService } from '../services/external-auth.service';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.scss']
})
export class LoginBarComponent {

  @ViewChild(LoginDialogComponent) loginDialog: LoginDialogComponent;
  @ViewChild(IgxDropDownComponent) igxDropDown: IgxDropDownComponent;

  constructor(public userService: UserService, private authService: ExternalAuthService, private router: Router) {
  }

  openDialog() {
    this.loginDialog.open();
  }

  handleLogout() {
    this.router.navigate(['/home']);
    this.userService.clearCurrentUser();
    this.authService.logout();
  }
}
