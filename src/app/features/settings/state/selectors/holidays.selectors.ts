import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HolidaysState, holidaysAdapter } from '../reducers/holidays.reducer';

export const selectHolidaysState = createFeatureSelector<HolidaysState>('holidays');

export const { selectAll: selectAllHolidays, selectEntities: selectHolidayEntities } =
    holidaysAdapter.getSelectors(createSelector(selectHolidaysState, (state) => state.holidays));

export const selectHolidaysLoading = createSelector(selectHolidaysState, (state) => state.loading);

export const selectHolidaysError = createSelector(selectHolidaysState, (state) => state.error);

export const selectSelectedYear = createSelector(selectHolidaysState, (state) => state.selectedYear);

export const selectTotalActiveInYear = createSelector(
    selectHolidaysState,
    (state) => state.totalActiveInYear
);

export const selectAlertLowCount = createSelector(
    selectTotalActiveInYear,
    (total) => total < 5
);
