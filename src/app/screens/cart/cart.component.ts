import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order, OrderChangeEmit } from 'src/app/common/interfaces';
import { CartService } from 'src/app/services/cart.service';
import { Subject } from 'rxjs';
import { DocumentReference } from 'angularfire2/firestore';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public order: Order;
  public items: {product: DocumentReference; quantity: number}[] = [];
  destroy$: Subject<any> = new Subject();

  constructor(protected cartService: CartService) {
  }

  placeOrder() {
    this.cartService.placeOrder();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.cartService.order.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.order = value;
    });
  }

}
