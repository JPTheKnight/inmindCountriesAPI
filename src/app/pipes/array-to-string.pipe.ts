import { Pipe, PipeTransform } from '@angular/core';
import { Currs } from '../models/country';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any, level: number): string {
    var final: string = '';

    if (value !== null) {
      if (level == 1) {
        final = Object.values(value)?.join(', ');
      } else if (level == 2) {
        for (let i = 0; i < Object.values(value)?.length; i++) {
          let currInter: Currs = Object.values(value)[i] as Currs;
          final += currInter.symbol + ', ' + currInter.name + ' / ';
        }
      }

      final = final.slice(0, -2);
    }

    return final;
  }
}
