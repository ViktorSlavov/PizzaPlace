import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { MenuItemDetailsComponent } from 'src/app/components/menu-item-details/menu-item-details.component';
import { LoadingScreenComponent } from 'src/app/components/loading-screen/loading-screen.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'product/:id',
    component: MenuItemDetailsComponent
  },
  {
    path: 'loading',
    component: LoadingScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingComponent { }
