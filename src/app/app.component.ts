import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from './app-routing.module';
import { IgxIconService } from 'igniteui-angular';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public appName = 'PIZZA PLACE';
  public topNavLinks: Array<{
    path: string,
    name: string
  }> = [];

  constructor(private router: Router, private iconService: IgxIconService, private cartService: CartService) {
  }

  public ngOnInit(): void {
    this.iconService.addSvgIcon('home-pizza', '/assets/pizza-slice.svg', 'custom-icon');
    this.iconService.addSvgIcon('SPICY', '/assets/hot.svg', 'spec-icon');
    this.iconService.addSvgIcon('DAIRY', '/assets/milk.svg', 'spec-icon');
    this.iconService.addSvgIcon('NUTS', '/assets/nut.svg', 'spec-icon');
    this.iconService.addSvgIcon('VEGAN', '/assets/vegan.svg', 'spec-icon');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
