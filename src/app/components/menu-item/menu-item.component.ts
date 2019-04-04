import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, PRODUCT_SPECIFICS_IMAGES, ProductRef } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input()
  public productRef: ProductRef;

  public get product(): Product {
    return this.productRef ? this.productRef.data : null;
  }

  public imageMap = PRODUCT_SPECIFICS_IMAGES;

  constructor(protected productService: ProductsService, protected cartService: CartService) { }

  addToCart() {
    this.cartService.addItem(this.productRef.ref.id);
  }

  ngOnInit() {
  }
}
