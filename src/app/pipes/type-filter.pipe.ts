import { Pipe, PipeTransform } from '@angular/core';
import { Product, ProductRef } from '../common/interfaces';

@Pipe({
  name: 'typeFilter'
})
export class TypeFilterPipe implements PipeTransform {

  transform(value: ProductRef[], typeFilter: {[key: string]: boolean}, pipeTrigger: number): ProductRef[] {
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
      if (entry.data.type) {
        return removedKeys.indexOf(entry.data.type) < 0;
      } else {
        return true;
      }
    });
  }

}
