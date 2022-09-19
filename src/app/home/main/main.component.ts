import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Country } from '../../models/country';
import { initializeState } from '../../store/actions/countries.actions';
import { AppState } from '../../store/country.state';
import {
  selectAllCountries,
  selectSpecificRegion,
} from '../../store/selectors/countries.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

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
}
