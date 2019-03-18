import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  {
    path: 'home',
    loadChildren: './screens/home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: './screens/about/about.module#AboutModule'
  },
  {
    path: 'stores',
    loadChildren: './screens/stores/stores.module#StoresModule'
  },
  {
    path: 'profile',
    loadChildren: './screens/profile/profile.module#ProfileModule'
  },
  {
    path: 'tracker',
    loadChildren: './screens/tracker/tracker.module#TrackerModule'
  },
  {
    path: 'mobile-app',
    loadChildren: './screens/mobile-app/mobile-app.module#MobileAppModule'
  },
  {
    path: 'careers',
    loadChildren: './screens/careers/careers.module#CareersModule'
  },
  {
    path: 'cart',
    loadChildren: './screens/cart/cart.module#CartModule'
  },
  {
    path: 'menu',
    loadChildren: './screens/menu/menu.module#MenuModule'
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
