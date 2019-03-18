import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresRoutingModule } from './stores-routing.module';
import { StoresPageComponent } from './stores.component';
import { StoreComponent } from '../../components/store/store.component';

@NgModule({
  imports: [
    CommonModule,
    StoresRoutingModule
  ],
  declarations: [StoresPageComponent, StoreComponent]
})
export class StoresModule { }
