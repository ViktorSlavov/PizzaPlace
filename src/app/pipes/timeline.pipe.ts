import { Pipe, PipeTransform } from '@angular/core';
import { TimelineDate } from '../common/interfaces';

@Pipe({
  name: 'timeline'
})
export class TimelinePipe implements PipeTransform {

  transform(timeline: TimelineDate[]): any {
    if (!timeline || !timeline.length) {
      return [];
    }
    const maxIndex = timeline.length - 1;
    timeline.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    return timeline.map((date, index, array) => {
      let ret = date;
      if (maxIndex >= index) {
        ret = Object.assign({}, date, { timeToNext: date.date.getTime() - array[index + 1].date.getTime() });
      }
      return ret;
    });

  }

}
