import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { MenuItemDetailsComponent } from 'src/app/components/menu-item-details/menu-item-details.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'product/:id',
    component: MenuItemDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingComponent { }
