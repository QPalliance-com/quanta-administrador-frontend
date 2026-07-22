import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HolidayCalendar } from '@/core/models/holiday.model';
import { HolidaysActions } from '../actions/holidays.actions';

export interface HolidaysState {
    holidays: EntityState<HolidayCalendar>;
    loading: boolean;
    error: string | null;
    selectedYear: number;
    totalActiveInYear: number;
}

export const holidaysAdapter: EntityAdapter<HolidayCalendar> = createEntityAdapter<HolidayCalendar>();

export const initialState: HolidaysState = {
    holidays: holidaysAdapter.getInitialState(),
    loading: false,
    error: null,
    selectedYear: new Date().getFullYear(),
    totalActiveInYear: 0
};

export const holidaysReducer = createReducer(
    initialState,

    on(HolidaysActions.loadList, (state, { year }) => ({
        ...state,
        loading: true,
        error: null,
        selectedYear: year
    })),
    on(HolidaysActions.loadListSuccess, (state, { data }) => ({
        ...state,
        holidays: holidaysAdapter.setAll(data.holidays, state.holidays),
        totalActiveInYear: data.totalActiveInYear,
        loading: false
    })),
    on(HolidaysActions.loadListFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(HolidaysActions.create, (state) => ({ ...state, loading: true, error: null })),
    on(HolidaysActions.createSuccess, (state) => ({ ...state, loading: false })),
    on(HolidaysActions.createFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(HolidaysActions.update, (state) => ({ ...state, loading: true, error: null })),
    on(HolidaysActions.updateSuccess, (state) => ({ ...state, loading: false })),
    on(HolidaysActions.updateFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(HolidaysActions.delete, (state) => ({ ...state, loading: true, error: null })),
    on(HolidaysActions.deleteSuccess, (state, { id }) => ({
        ...state,
        holidays: holidaysAdapter.removeOne(id, state.holidays),
        loading: false
    })),
    on(HolidaysActions.deleteFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(HolidaysActions.importBatch, (state) => ({ ...state, loading: true, error: null })),
    on(HolidaysActions.importBatchSuccess, (state) => ({ ...state, loading: false })),
    on(HolidaysActions.importBatchFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(HolidaysActions.setSelectedYear, (state, { year }) => ({ ...state, selectedYear: year })),
    on(HolidaysActions.clearError, (state) => ({ ...state, error: null }))
);
