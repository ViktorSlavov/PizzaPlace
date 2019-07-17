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
    loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./screens/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./screens/stores/stores.module').then(m => m.StoresModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./screens/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'tracker',
    loadChildren: () => import('./screens/tracker/tracker.module').then(m => m.TrackerModule)
  },
  {
    path: 'mobile-app',
    loadChildren: () => import('./screens/mobile-app/mobile-app.module').then(m => m.MobileAppModule)
  },
  {
    path: 'careers',
    loadChildren: () => import('./screens/careers/careers.module').then(m => m.CareersModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./screens/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./screens/menu/menu.module').then(m => m.MenuModule)
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
