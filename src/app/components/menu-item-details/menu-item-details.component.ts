import { Component, OnInit } from '@angular/core';
import { PRODUCT_SPECIFICS, PRODUCT_TYPES, Product } from 'src/app/common/interfaces';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { Subject } from 'rxjs';


const item: Product = {
  image: 'spicy_chicken',
  name: 'Spicy Chicken Wings',
  price: 6.49,
  specifics: [PRODUCT_SPECIFICS.SPICY],
  type: PRODUCT_TYPES.SIDE,
  description: `Crispy buffalo wings, deep-fried with our special mixture of herbs and spices.
  But beware - our patented Pretty-Hot-Sh*t™ sauce gives them quite a kick!
  Only for those brave enough to put some sweat into their dining!`
};

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent extends MenuItemComponent implements OnInit {
  constructor(
    protected productService: ProductsService,
    protected cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(productService, cartService);
  }

  ngOnInit() {
    const unsub$ = new Subject();
    this.route.paramMap.pipe(map((paramMap) => {
      return  paramMap.get('id');
    })).subscribe((param: string) => {
      this.productService.items.pipe(takeUntil(unsub$)).subscribe(() => {
        this.productRef = this.productService.getProduct(param);
        unsub$.next();
        unsub$.complete();
      });
    });
  }
}
