import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../common/interfaces';

@Pipe({
  name: 'typeFilter'
})
export class TypeFilterPipe implements PipeTransform {

  transform(value: Product[], typeFilter: {[key: string]: boolean}, pipeTrigger: number): Product[] {
    if (!typeFilter) {
      return value;
    }
    const removedKeys = Object.keys(typeFilter).filter(filter => !typeFilter[filter]);
    // If all boxes are checked, do nothing
    const noFilters = removedKeys.length === 0;
    if (noFilters) {
      return value;
    }
    return value.filter(entry => {
      if (entry.type) {
        return removedKeys.indexOf(entry.type) < 0;
      } else {
        return true;
      }
    });
  }

}
