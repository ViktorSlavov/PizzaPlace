import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrderSummaryItemComponent } from '../order-summary/order-summary-item/order-summary-item.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent extends OrderSummaryItemComponent implements OnInit, OnDestroy {
  public maxItems = 16;

  constructor(protected cartService: CartService, protected productService: ProductsService) {
    super(productService);
  }

  add() {
    this.cartService.addItem(this.item.id);
  }

  subtract() {
    this.cartService.removeItem(this.item.id);
  }

  remove() {
    this.cartService.deleteItem(this.item.id);
  }
}
