import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../common/interfaces';

@Pipe({
  name: 'textFilter'
})
export class TextFilterPipe implements PipeTransform {

  transform(value: Product[], searchTerm: string, pipeTrigger: number): Product[] {
    if (!searchTerm) {
      return value;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return value.filter(entry => entry.name.toLowerCase().indexOf(lowerSearch) > -1);
  }

}
