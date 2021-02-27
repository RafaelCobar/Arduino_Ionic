import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menu'
})
export class MenuPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
