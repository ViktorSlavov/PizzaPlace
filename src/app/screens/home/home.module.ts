import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRouterModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IgxCardModule, IgxButtonModule, IgxCarouselModule, IgxIconModule, IgxAvatarModule } from 'igniteui-angular';
import { OffersComponent } from '../../components/offers/offers.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRouterModule,
    IgxCardModule,
    IgxButtonModule,
    IgxCarouselModule,
    IgxIconModule,
    IgxAvatarModule
  ],
  declarations: [HomeComponent, OffersComponent]
})
export class HomeModule { }
