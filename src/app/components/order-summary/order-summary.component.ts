import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../common/interfaces';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input()
  public order: Order = null;

  constructor() { }

  ngOnInit() {
  }

}
