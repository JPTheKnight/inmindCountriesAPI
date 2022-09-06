import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any): string {
    var final: string = '';

    for (let i = 3; i < JSON.stringify(value).split('"').length; i += 4) {
      final += JSON.stringify(value).split('"')[i] + ', ';
    }

    final = final.slice(0, -2);

    return final;
  }
}
