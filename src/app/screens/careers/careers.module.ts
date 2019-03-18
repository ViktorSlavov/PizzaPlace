import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers.component';

@NgModule({
  imports: [
    CommonModule,
    CareersRoutingModule
  ],
  declarations: [CareersComponent]
})
export class CareersModule { }
