import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IgxIconService, } from 'igniteui-angular';
import { CartService } from './services/cart.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, style, state, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('addedItem', [
    // ...
    state('initial', style({
      transform: 'scale(1)'
    })),
    state('grow', style({
      transform: 'scale(1.2)'
    })),
    state('shrink', style({
      transform: 'scale(0.8)'
    })),
    transition('initial => grow', [
      animate('420ms cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({
        transform: `scale(1.2)`
      }))
    ]),
    transition('grow => initial', [
      animate('420ms cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({
        transform: 'scale(1)'
      }))
    ]),
    transition('initial => shrink', [
      animate('420ms cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({
        transform: 'scale(0.8)'
      }))
    ]),
    transition('shrink => initial', [
      animate('420ms cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({
        transform: 'scale(1)'
      }))
    ])
  ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  public adding = 0;
  private destroy$ = new Subject();
  public appName = 'PIZZA PLACE';
  protected _prevOrderSize = 0;
  private _orderQuantity = 0;
  public get orderQuantity(): number {
    return this._orderQuantity;
  }
  public set orderQuantity(val: number) {
    this._prevOrderSize = this._orderQuantity;
    this._orderQuantity = val;
  }
  public topNavLinks: Array<{
    path: string,
    name: string
  }> = [];

  constructor(private router: Router, private iconService: IgxIconService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.iconService.addSvgIcon('home-pizza', '/assets/pizza-slice.svg', 'custom-icon');
    this.iconService.addSvgIcon('SPICY', '/assets/hot.svg', 'spec-icon');
    this.iconService.addSvgIcon('DAIRY', '/assets/milk.svg', 'spec-icon');
    this.iconService.addSvgIcon('NUTS', '/assets/nut.svg', 'spec-icon');
    this.iconService.addSvgIcon('VEGAN', '/assets/vegan.svg', 'spec-icon');

    this.cartService.order.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.orderQuantity = this.cartService.totalItemCount;
      if (this.orderQuantity > this._prevOrderSize) {
        this.adding = 1;
      } else {
        this.adding = -1;
      }
      this.orderQuantity = this.cartService.totalItemCount;
      const sub = timer(420).subscribe(() => {
        this.adding = 0;
        sub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {

  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
