import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanReadablePrice'
})
export class HumanReadablePricePipe implements PipeTransform {

  transform(value: number): string | null | number {
    // return null;
    
    if (Number.isNaN(value)) {
      return null;
    }

    if (value < 100) {
      return value;
    } else if(value < 10000000){
      return value / 100000 + " lakh";
    } else {
      return value / 10000000 + " crore";
    }

  }

}
