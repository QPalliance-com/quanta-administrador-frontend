import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountriesState } from '../reducers/countries.reducer';

export const selectCountriesState = createFeatureSelector<CountriesState>('countries');

export const selectAllCountries = createSelector(selectCountriesState, (state) => state.countries);

export const selectCountriesLoading = createSelector(selectCountriesState, (state) => state.loading);
