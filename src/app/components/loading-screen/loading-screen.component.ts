import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, from, timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  public slices = ['first', 'second', 'third', 'fourth'];
  public hiddenSlice = 'second';
  private destroy$ = new Subject();
  constructor() { }

  ngOnInit() {
    interval(450).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.hiddenSlice !== this.slices[this.slices.length - 1]) {
        this.hiddenSlice = this.slices[this.slices.indexOf(this.hiddenSlice) + 1];
      } else {
        this.hiddenSlice = this.slices[0];
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
