import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogsState } from '../reducers/catalogs.reducer';

export const selectCatalogsState = createFeatureSelector<CatalogsState>('catalogs');

export const selectPaymentTypes = createSelector(selectCatalogsState, (state) => state.paymentTypes);

export const selectPaymentTypesCountry = createSelector(selectCatalogsState, (state) => state.paymentTypesCountry);

export const selectPeriods = createSelector(selectCatalogsState, (state) => state.periods);

export const selectPeriodsLoaded = createSelector(selectCatalogsState, (state) => state.periodsLoaded);

export const selectCatalogsLoading = createSelector(selectCatalogsState, (state) => state.loading);
