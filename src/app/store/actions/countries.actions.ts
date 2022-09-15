import { createAction, props } from '@ngrx/store';
import { Country } from '../../models/country';

// export enum CountryActionType {
//   ADD_ITEM = '[COUNTRY] Add COUNTRY',
//   INITIALIZE_ITEMS = '[COUNTRY] Initialize COUNTRY',
// }

// export class InitializeCountriesAction implements Action {
//   readonly type = CountryActionType.INITIALIZE_ITEMS;
//   constructor(public payload: Country[]) {}
// }

// export class AddCountryAction implements Action {
//   readonly type = CountryActionType.ADD_ITEM;
//   constructor(public payload: Country) {}
// }

// export type CountryAction = AddCountryAction | InitializeCountriesAction;

export const initializeState = createAction('[COUNTRY] Initialize Country');

export const loadCountriesSuccess = createAction(
  '[COUNTRY] Country Load Success',
  props<{ payload: Country[] }>()
);

export const loadCountriesFailure = createAction(
  '[COUNTRY] Country Load Failure',
  props<{ error: string }>()
);
