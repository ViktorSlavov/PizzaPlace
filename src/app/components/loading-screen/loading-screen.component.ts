import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, from, timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  animations: [
    trigger('eatPizza', [
      transition(':enter', [
        style({transform: 'scale(0.3) translateY(60px)', opacity: 0.2 }),
        animate('350ms cubic-bezier(0.075, 0.82, 0.165, 1)', style({ transform: 'scale(1) translateY(0px)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1) translateY(0px)', opacity: 1 }),
        animate('250ms cubic-bezier(0.895, 0.03, 0.685, 0.22)', style({ transform: 'scale(0.3) translateY(60px)', opacity: 0.2 })),
      ])
  ])]
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  public slices = ['first', 'second', 'third', 'fourth'];
  public hiddenSlices = [];
  public hiddenPieces = 0;
  private destroy$ = new Subject();
  constructor() { }

  ngOnInit() {
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.hiddenPieces !== this.slices.length) {
        this.hiddenSlices.push(this.slices[this.hiddenPieces]);
        this.hiddenPieces++;
      } else {
        this.hiddenSlices = [];
        this.hiddenPieces = 0;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
