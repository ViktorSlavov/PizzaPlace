import { Pipe, PipeTransform } from '@angular/core';
import { Product, ProductRef } from '../common/interfaces';

@Pipe({
  name: 'textFilter'
})
export class TextFilterPipe implements PipeTransform {

  transform(value: ProductRef[], searchTerm: string, pipeTrigger: number): ProductRef[] {
    if (!searchTerm) {
      return value;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return value.filter(entry => entry.data.name.toLowerCase().indexOf(lowerSearch) > -1);
  }

}
