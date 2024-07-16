import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tShirtFormat'
})
export class TShirtFormatPipe implements PipeTransform {

  transform(ctg: string): string {

    return ctg === 'T_Shirts'? 'T-Shirts': ctg;
  }

}
