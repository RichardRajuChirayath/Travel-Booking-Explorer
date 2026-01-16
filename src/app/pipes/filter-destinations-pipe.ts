import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDestinations',
})
export class FilterDestinationsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
