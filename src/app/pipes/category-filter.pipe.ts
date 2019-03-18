import { Pipe, PipeTransform } from '@angular/core';
import { Product, PRODUCT_TYPES } from '../common/interfaces';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: Product[], categoryFilter: {[key: string]: boolean}, pipeTrigger: number): Product[] {
    if (!categoryFilter) {
      return value;
    }
    const removedKeys = Object.keys(categoryFilter).filter(filter => !categoryFilter[filter]);
    // If all boxes are checked, do nothing
    const noFilters = removedKeys.length === 0;
    if (noFilters) {
      return value;
    }
    return value.filter(entry => {
      if (entry.specifics && entry.specifics.length) {
        return entry.specifics.filter(specific => removedKeys.indexOf(specific) > -1).length === 0;
      } else {
        return true;
      }
    });
  }

}
