import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Subject } from 'rxjs';
import { Product } from '../../../common/interfaces';
import { takeUntil } from 'rxjs/operators';
import { DocumentReference } from 'angularfire2/firestore';

@Component({
  selector: 'app-order-summary-item',
  templateUrl: './order-summary-item.component.html',
  styleUrls: ['./order-summary-item.component.scss']
})
export class OrderSummaryItemComponent implements OnInit, OnDestroy {
  protected destroy$: Subject<any> = new Subject<any>();
  public product: Product;
  @Input()
  public item: DocumentReference;

  @Input()
  public quantity = 1;

  constructor(protected productService: ProductsService) { }

  public ngOnInit() {
    this.productService.getProductByName(this.item.id).pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.product = e;
    });
  }

  public ngOnDestroy() {
    this.destroy$.complete();
  }
}
