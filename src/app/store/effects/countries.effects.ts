import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  initializeState,
  loadCountriesFailure,
  loadCountriesSuccess,
  modifyCountryInfo,
} from '../actions/countries.actions';
import { CountriesService } from 'src/app/countries.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeState),
      switchMap(() =>
        this.countriesService.getAllCountries().pipe(
          map((countries) => loadCountriesSuccess({ payload: countries })),
          catchError((error) => of(loadCountriesFailure({ error })))
        )
      )
    )
  );
}
