import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any, level: number): string {
    var final: string = '';

    if (level == 1) {
      for (let i = 3; i < JSON.stringify(value).split('"').length; i += 4) {
        final += JSON.stringify(value).split('"')[i] + ', ';
      }
    } else if (level == 2) {
      for (let i = 5; i < JSON.stringify(value).split('"').length; i += 4) {
        final += JSON.stringify(value).split('"')[i] + ', ';
      }
    }

    final = final.slice(0, -2);

    return final;
  }
}
