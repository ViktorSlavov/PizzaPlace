import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-screen.component';
import { IgxCardModule } from 'igniteui-angular';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IgxCardModule
  ],
  declarations: [ProfilePageComponent]
})
export class ProfileModule { }
