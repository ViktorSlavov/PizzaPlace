import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { OrderChangeEmit } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { OrderSummaryItemComponent } from '../order-summary/order-summary-item/order-summary-item.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent extends OrderSummaryItemComponent implements OnInit, OnDestroy {
  public maxItems = 16;

  @Output()
  public quantityChange = new EventEmitter<OrderChangeEmit>();

  constructor(protected productService: ProductsService) {
    super(productService);
  }

  subtract() {
    this.quantity = this.quantity > 0 ? this.quantity - 1 : this.quantity;
    this.quantityChange.emit({
      product: this.product,
      quantity: this.quantity
    });
  }

  add() {
    this.quantity = this.maxItems > this.quantity ? this.quantity + 1 : this.quantity;
    this.quantityChange.emit({
      product: this.product,
      quantity: this.quantity
    });
  }

  remove() {
    this.quantity = 0;
    this.quantityChange.emit({
      product: this.product,
      quantity: this.quantity
    });
  }
}
