import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileAppRoutingComponent } from './mobile-app-routing.module';
import { MobileAppComponent } from './mobile-app.component';

@NgModule({
  imports: [
    CommonModule,
    MobileAppRoutingComponent
  ],
  declarations: [MobileAppComponent]
})
export class MobileAppModule { }
