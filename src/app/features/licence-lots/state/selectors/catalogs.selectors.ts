import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatalogsState } from '../reducers/catalogs.reducer';

export const selectCatalogsState = createFeatureSelector<CatalogsState>('catalogs');

export const selectPaymentTypes = createSelector(selectCatalogsState, (state) => state.paymentTypes);

export const selectPeriods = createSelector(selectCatalogsState, (state) => state.periods);

export const selectCatalogsLoaded = createSelector(selectCatalogsState, (state) => state.loaded);

export const selectCatalogsLoading = createSelector(selectCatalogsState, (state) => state.loading);
