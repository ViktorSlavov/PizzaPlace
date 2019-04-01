import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-screen.component';
import { IgxCardModule, IgxIconModule, IgxAvatarModule, IgxInputGroupModule,
  IgxExpansionPanelModule, IgxButtonModule } from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoFormComponent } from '../../components/user-info-form/user-info-form.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { OrderSummaryItemComponent } from '../../components/order-summary/order-summary-item/order-summary-item.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IgxCardModule,
    IgxAvatarModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxExpansionPanelModule,
    IgxButtonModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilePageComponent, UserInfoFormComponent, OrderSummaryComponent, OrderSummaryItemComponent]
})
export class ProfileModule { }
