import { Component, OnInit } from '@angular/core';
import { PRODUCT_SPECIFICS, PRODUCT_TYPES, Product } from 'src/app/common/interfaces';


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
export class MenuItemDetailsComponent implements OnInit {
  product: Product = null;
  constructor() { }

  ngOnInit() {
    this.product = item;
  }

}
