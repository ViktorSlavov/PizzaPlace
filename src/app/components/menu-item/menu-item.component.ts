import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, AfterViewInit {
  @Output()
  public addition = new EventEmitter();

  @Input()
  public product: Product;
  destroy$: Subject<any> = new Subject();

  public getUrl(relativeUrl: string) {
    return `url('${relativeUrl}')`;
  }

  constructor(protected productService: ProductsService, protected currentRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.product === undefined) {
      this.currentRoute.params.subscribe(e => {
        this.productService.getProductByName(e.name).pipe(takeUntil(this.destroy$)).subscribe(product => {
          this.product = product;
        });
      });
    }
  }
}
