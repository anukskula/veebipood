import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemPrice'
})
export class ItemPricePipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString("ee", 
      {minimumFractionDigits: 2, maximumFractionDigits: 2}
    ).split(",").join(" ") + " €";
  }

}
