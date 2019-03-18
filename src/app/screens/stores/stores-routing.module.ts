import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresPageComponent } from './stores.component';


const routes: Routes = [
  {
    path: '',
    component: StoresPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
