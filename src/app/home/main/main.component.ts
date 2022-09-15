import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from '../../countries.service';
import { Country } from '../../models/country';
import { Observable, Subject, of, Subscription } from 'rxjs';
import { switchMap, filter, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { initializeState } from '../../store/actions/countries.actions';
import {
  selectAllCountries,
  selectSpecificRegion,
} from '../../store/selectors/countries.selector';
import { AppState } from '../../store/country.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    private countriesService: CountriesService,
    private store: Store<AppState>
  ) {}

  searchTerms: string = '';
  totalCountries: number = 0;
  availableRegions?: Array<string> = [];
  allCountries$: Observable<Country[]> = this.store.select(selectAllCountries);
  regionSelected: string = 'all';

  subscriptions: Subscription[] = [];

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

    this.subscriptions.push(
      this.store.select(selectAllCountries).subscribe((data) => {
        if (data.length == 0) {
          this.store.dispatch(initializeState());
        }
      })
    );

    this.subscriptions.push(
      this.allCountries$.subscribe((data) => {
        this.totalCountries = data.length;
        this.availableRegions = [
          ...new Set(data.map((region) => region.region)),
        ];
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((elt) => elt.unsubscribe());
  }

  showFilters() {
    const filterDialog = document.getElementById('filter-dialog');
    if (filterDialog != null) filterDialog.style.display = 'flex';
  }

  getInputCountries(): Observable<Country[]> {
    if (this.searchTerms == '') {
      return this.allCountries$;
    } else {
      return this.allCountries$.pipe(
        map((data) =>
          data.filter((obj) =>
            obj.name.common
              .toLowerCase()
              .includes(this.searchTerms.toLowerCase())
          )
        )
      );
    }
  }

  search(term: string): void {
    if (term != '') this.searchTerms = term;
    else {
      this.searchTerms = '';
      this.getRegions(this.regionSelected);
    }
  }

  getRegions(region: string) {
    if (region.toLowerCase() == 'all') {
      this.allCountries$ = this.store
        .select(selectAllCountries)
        .pipe(tap((data) => (this.totalCountries = data.length)));
      this.regionSelected = 'all';
    } else {
      this.allCountries$ = this.store
        .select(selectSpecificRegion(region))
        .pipe(tap((data) => (this.totalCountries = data.length)));
      this.regionSelected = region;
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
