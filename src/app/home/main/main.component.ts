import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/countries.service';
import { Country } from 'src/app/models/country';
import { Observable, Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  mainCountries: Country[] = [];
  countries: Country[] = [];
  private searchTerms = new Subject<string>();
  totalCountries: number = 0;
  availableRegions?: Array<string> = [];

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

    this.countriesService.getAllCountries().subscribe((c) => {
      this.totalCountries = c.length;
      this.countries = c;
      this.mainCountries = c;
      this.countriesService.countries$ = of(c);
      this.availableRegions = [
        ...new Set(this.countries.map((region) => region.region)),
      ];
    });

    this.searchTerms
      .pipe(
        switchMap((term: string) =>
          of(
            this.mainCountries.filter((obj) =>
              obj.name.common.toLowerCase().includes(term.toLowerCase())
            )
          )
        )
      )
      .subscribe((data) => (this.countries = data));
  }

  showFilters() {
    const filterDialog = document.getElementById('filter-dialog');
    if (filterDialog != null) filterDialog.style.display = 'flex';
  }

  search(term: string): void {
    if (term != '') this.searchTerms.next(term);
    else {
      this.countries = this.mainCountries;
    }
  }

  getRegions(region: string) {
    this.countries = [];
    this.mainCountries = [];

    if (region == 'All') {
      this.countriesService.countries$.subscribe((data) => {
        this.mainCountries = data;
        this.countries = data;
      });
    } else {
      this.countriesService
        .getCountriesToASpecificRegion(region)
        .subscribe((c) => {
          this.totalCountries = c.length;
          this.mainCountries = c;
          this.countries = c;
        });
      // this.countriesService.countries$.subscribe((data) => {
      //   this.mainCountries = data.filter(
      //     (obj) => obj.region.toLowerCase() == region.toLowerCase()
      //   );
      //   this.countries = this.mainCountries;
      //   this.totalCountries = this.mainCountries.length;
      // });
    }
  }

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
