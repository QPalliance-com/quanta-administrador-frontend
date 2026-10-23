import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Timezone } from '@/core/models/timezone.model';
import { TimezoneActions } from '../actions/timezone.actions';

export interface TimezoneState {
    timezones: EntityState<Timezone>;
    loadedCountries: string[];
    error: string | null;
}

export const timezoneAdapter: EntityAdapter<Timezone> = createEntityAdapter<Timezone>();

export const initialTimezoneState: TimezoneState = {
    timezones: timezoneAdapter.getInitialState(),
    loadedCountries: [],
    error: null
};

export const timezoneReducer = createReducer(
    initialTimezoneState,
    on(TimezoneActions.loadTimezones, (state) => ({
        ...state,
        error: null
    })),
    on(TimezoneActions.loadTimezonesSuccess, (state, { countryCode, timezones }) => ({
        ...state,
        timezones: timezoneAdapter.upsertMany(timezones, state.timezones),
        loadedCountries: state.loadedCountries.includes(countryCode)
            ? state.loadedCountries
            : [...state.loadedCountries, countryCode]
    })),
    // Sin zonas para ese país el formulario sigue usable y el backend aplica su default al guardar
    on(TimezoneActions.loadTimezonesFailure, (state, { error }) => ({
        ...state,
        error
    }))
);
