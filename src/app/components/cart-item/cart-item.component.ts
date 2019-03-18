import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { OrderChangeEmit, Product } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { DocumentReference } from 'angularfire2/firestore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {


  public maxItems = 16;
  @Input()
  public quantity = 1;

  @Input()
  public item: DocumentReference;

  public product: Product;

  @Output()
  public quantityChange = new EventEmitter<OrderChangeEmit>();
  protected destroy$: Subject<any> = new Subject<any>();

  constructor(protected productService: ProductsService, protected cdr: ChangeDetectorRef) { }

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

  public ngOnInit() {
    this.productService.getProductByName(this.item.id).pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.product = e;
    });
  }

  public ngOnDestroy() {
    this.destroy$.complete();
  }
}
