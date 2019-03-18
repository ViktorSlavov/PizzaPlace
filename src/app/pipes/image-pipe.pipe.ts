import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): any {
    return `/assets/pizzas/${value}.jpg`;
  }

}
