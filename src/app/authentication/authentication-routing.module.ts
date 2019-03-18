import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RedirectComponent } from './redirect/redirect.component';
import { ExternalAuthProvider, ExternalAuthRedirectUrl } from './services/external-auth.service';

const authRoutes: Routes = [
    { path: ExternalAuthRedirectUrl.Google, component: RedirectComponent, data: { provider: ExternalAuthProvider.Google } },
    { path: ExternalAuthRedirectUrl.Facebook, component: RedirectComponent, data: { provider: ExternalAuthProvider.Facebook } },
    { path: ExternalAuthRedirectUrl.Microsoft, component: RedirectComponent, data: { provider: ExternalAuthProvider.Microsoft } }
];

@NgModule({
    imports: [
      RouterModule.forChild(authRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AuthenticationRoutingModule {}
