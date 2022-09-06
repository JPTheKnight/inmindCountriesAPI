import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nFormatter',
})
export class NFormatterPipe implements PipeTransform {
  transform(value: number): unknown {
    var newValueStr: string = '';
    if (value >= 1000) {
      var suffixes: string[] = ['', 'k', 'm', 'b', 't'];
      var suffixNum: number = Math.floor(('' + value).length / 3);
      var shortValue: number = 0;
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + '').replace(
          /[^a-zA-Z 0-9]+/g,
          ''
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      var shortValueStr: string = '';
      if (shortValue % 1 != 0) shortValueStr = shortValue.toFixed(1);
      newValueStr = shortValue + suffixes[suffixNum];
    }
    return newValueStr;
  }
}
