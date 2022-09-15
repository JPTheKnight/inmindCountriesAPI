import { Country } from 'src/app/models/country';
import { createReducer, on } from '@ngrx/store';
import {
  initializeState,
  loadCountriesFailure,
  loadCountriesSuccess,
} from '../actions/countries.actions';

export interface CountryState {
  countries: Country[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CountryState = {
  countries: [],
  error: '',
  status: 'pending',
};

export const countryReducer = createReducer(
  initialState,
  on(initializeState, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadCountriesSuccess, (state, { payload }) => ({
    ...state,
    countries: [...payload],
    error: '',
    status: 'success',
  })),
  on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);