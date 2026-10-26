import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpiringLotsState } from '../reducers/expiring-lots.reducer';

export const selectExpiringLotsState = createFeatureSelector<ExpiringLotsState>('expiringLots');

export const selectExpiringLots = createSelector(selectExpiringLotsState, (state) => state.lots);

export const selectExpiringLotsLoading = createSelector(selectExpiringLotsState, (state) => state.loading);

export const selectExpiringLotsLoaded = createSelector(selectExpiringLotsState, (state) => state.loaded);

export const selectExpiringLotsError = createSelector(selectExpiringLotsState, (state) => state.error);
