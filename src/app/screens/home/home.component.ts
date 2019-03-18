import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../common/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public offers: Offer[];
  constructor(public offerService: OffersService) {
    this.offers = offerService.offers;
  }

  ngOnInit() {
  }

}
