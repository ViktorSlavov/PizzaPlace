import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-screen.component';
import { IgxCardModule, IgxIconModule, IgxAvatarModule } from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IgxCardModule,
    IgxAvatarModule,
    IgxIconModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilePageComponent]
})
export class ProfileModule { }
