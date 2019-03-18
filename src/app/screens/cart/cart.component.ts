import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Order, Product, OrderChangeEmit } from 'src/app/common/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { DocumentReference } from 'angularfire2/firestore';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  protected orderSub$: BehaviorSubject<Order>;
  public order: Order;
  public items: {product: DocumentReference; quantity: number}[] = [];
  destroy$: Subject<any> = new Subject();

  constructor(protected cartService: CartService, protected productService: ProductsService, protected cdr: ChangeDetectorRef) {
  }

  orderChange(event: OrderChangeEmit, product: DocumentReference) {
    this.cartService.changeEntry(product, event.quantity);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.orderSub$ = this.cartService.items;
    this.orderSub$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.order = value;
    });
  }

}
