import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimezoneState, timezoneAdapter } from '../reducers/timezone.reducer';

export const selectTimezoneState = createFeatureSelector<TimezoneState>('timezones');

export const { selectAll: selectAllTimezones } = timezoneAdapter.getSelectors(
    createSelector(selectTimezoneState, (state) => state.timezones)
);

export const selectLoadedTimezoneCountries = createSelector(
    selectTimezoneState,
    (state) => state.loadedCountries
);
