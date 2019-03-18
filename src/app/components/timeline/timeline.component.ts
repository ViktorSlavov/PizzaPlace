import { Component, OnInit, Input } from '@angular/core';
import { TimelineDate } from 'src/app/common/interfaces';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input()
  public timeline: TimelineDate[];
  constructor() { }

  ngOnInit() {
  }

}
