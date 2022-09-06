import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/countries.service';
import { Country } from 'src/app/country';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private countriesServcice: CountriesService) {}

  countries: Country[] = [];

  ngOnInit(): void {
    const filterDialog = document.getElementById(
      'filter-dialog'
    )! as HTMLElement;
    document.addEventListener('click', (e) => {
      if (
        (e.target as HTMLElement)?.closest('.filter-dialog') == null &&
        (e.target as HTMLElement)?.closest('.filter') == null
      ) {
        filterDialog.style.display = 'none';
      }
    });

    this.countriesServcice
      .getAllCountries()
      .subscribe((c) => (this.countries = c));
  }

  onCloseMenu() {
    const sideMenu = document.getElementById('side-menu-bg');
    if (sideMenu != null) sideMenu.style.display = 'none';
  }

  onOpenMenu() {
    const sideMenu = document.getElementById('side-menu-bg');
    if (sideMenu != null) sideMenu.style.display = 'block';
  }

  showFilters() {
    const filterDialog = document.getElementById('filter-dialog');
    if (filterDialog != null) filterDialog.style.display = 'flex';
  }

  showCountryDetails(name: string) {}

  nFormatter = (value: number) => {
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
  };

  getAverageRGB(imgEl: any) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = { r: 0, g: 0, b: 0 },
      count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height =
      imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
      imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  }
}
