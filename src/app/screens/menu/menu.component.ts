import { Component, OnInit } from '@angular/core';
import { Product, PRODUCT_TYPES, PRODUCT_SPECIFICS, PRODUCT_SPECIFICS_IMAGES, ProductRef } from 'src/app/common/interfaces';
import { Observable, from } from 'rxjs';
import { dummyProducts } from '../../common/dummy.data';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('scaleIn', [
      transition(':enter', [
        style({transform: 'translateX(50%)', opacity: 0.2 }),
        animate('350ms cubic-bezier(0.075, 0.82, 0.165, 1)', style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('250ms cubic-bezier(0.895, 0.03, 0.685, 0.22)', style({ transform: 'translateX(50%)', opacity: 0.2 })),
      ]),
    ]),
  ]
})
export class MenuComponent implements OnInit {
  public productTypes = PRODUCT_TYPES;
  public productSpecifics = PRODUCT_SPECIFICS;
  public specificsImages = PRODUCT_SPECIFICS_IMAGES;
  public searchValue = '';
  public typeFilter: {[key: string]: boolean} = {};
  public specificFilter: {[key: string]: boolean} = {};
  public products: Observable<ProductRef[]>;
  public specifics: string[] = [];
  public types: string[] = [];
  public pipeTrigger = 0;

  constructor(public productService: ProductsService) { }

  triggerCheck() {
    this.pipeTrigger++;
  }

  ngOnInit() {
    this.products = this.productService.items;
    const types = Object.keys(this.productTypes);
    const specifics = Object.keys(this.productSpecifics);
    for (let i = 0; i < types.length; i++) {
      this.typeFilter[types[i]] = true;
      this.types.push(types[i]);
    }
    for (let i = 0; i < specifics.length; i++) {
      this.specificFilter[specifics[i]] = true;
      this.specifics.push(specifics[i]);
    }
  }

}
