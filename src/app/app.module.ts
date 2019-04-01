import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  IgxNavbarModule, IgxToggleModule,
  IgxAvatarModule, IgxInputGroupModule, IgxIconModule, IgxButtonModule, IgxIconService, IgxCardModule
} from 'igniteui-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule, ExternalAuthService } from './authentication';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    // NOTE: `AuthenticationModule` defines child routes, must be imported before root `AppRoutingModule`
    AuthenticationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    IgxNavbarModule,
    CommonModule,
    IgxIconModule,
    IgxToggleModule,
    IgxAvatarModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxCardModule
  ],
  providers: [IgxIconService],
  bootstrap: [AppComponent]
})
export class AppModule {

  public appName = 'PIZZA PLACE';
  constructor(private externalAuthService: ExternalAuthService) {
    /**
     * To register a social login, un-comment one or more of the following and add your service provider Client ID.
     * See https://github.com/IgniteUI/igniteui-cli/wiki/Angular-Authentication-Project-Template#add-a-third-party-social-provider
     */
    // this.externalAuthService.addGoogle('<CLIENT_ID>');

    // this.externalAuthService.addMicrosoft('<CLIENT_ID>');

    // this.externalAuthService.addFacebook('<CLIENT_ID>');
  }
}
