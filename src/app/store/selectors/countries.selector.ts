import { createSelector } from '@ngrx/store';
import { AppState } from '../country.state';
import { CountryState } from '../reducers/country.reducer';

export const selectCountries = (state: AppState) => state.countries;

export const selectAllCountries = createSelector(
  selectCountries,
  (state: CountryState) => state.countries
);

export const selectSpecificRegion = (region: string) =>
  createSelector(selectCountries, (state: CountryState) =>
    state.countries.filter(
      (obj) => obj.region.toLowerCase() == region.toLowerCase()
    )
  );

export const selectCountry = (name: string) =>
  createSelector(
    selectCountries,
    (state: CountryState) =>
      state.countries.filter(
        (obj) => obj.name.common.toLowerCase() == name.toLowerCase()
      )[0]
  );
