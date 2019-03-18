import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Input()
  public slides: any[] = [];
  public interval = 3000;
  public pause = true;
  public loop = true;
  constructor() { }

  public ngOnInit() {
  }

  public getStyle(image: string): string {
    return `url(${image})`;
  }
}
