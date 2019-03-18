import { Injectable } from '@angular/core';
import { Offer } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  public offers: Offer[] = [{
    name: '2 4 1',
    link: '#',
    image: 'assets/pizzas/1.jpg'
  }, {
    name: 'Tiny, Tiny Pizzas!',
    link: '#',
    image: 'assets/pizzas/2.jpg'
  }, {
    name: 'Another pizza!',
    link: '#',
    image: 'assets/pizzas/3.jpg'
  }];
}
