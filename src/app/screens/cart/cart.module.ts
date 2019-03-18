import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import {
  IgxAvatarModule,
  IgxCardModule,
  IgxExpansionPanelModule,
  IgxButtonModule,
  IgxInputGroupModule,
  IgxCheckboxModule,
  IgxIconModule
} from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { ImagePipeModule } from 'src/app/pipes/image-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule,
    IgxAvatarModule,
    IgxCardModule,
    IgxExpansionPanelModule,
    IgxButtonModule,
    IgxInputGroupModule,
    IgxCheckboxModule,
    IgxIconModule,
    ImagePipeModule
  ],
  declarations: [CartComponent, CartItemComponent]
})
export class CartModule { }
