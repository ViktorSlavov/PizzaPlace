import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePageComponent } from './profile-screen.component';
import { AuthGuard } from 'src/app/authentication';


const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
