import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return Number(value).toLocaleString('en-IN');
  }
}
