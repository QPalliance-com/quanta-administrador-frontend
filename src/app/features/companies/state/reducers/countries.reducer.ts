import { createReducer, on } from '@ngrx/store';
import { CountryCatalog } from '@/core/models';
import { CountriesActions } from '../actions/countries.actions';

export interface CountriesState {
    countries: CountryCatalog[];
    loaded: boolean;
    loading: boolean;
    error: string | null;
}

export const initialCountriesState: CountriesState = {
    countries: [],
    loaded: false,
    loading: false,
    error: null
};

export const countriesReducer = createReducer(
    initialCountriesState,
    on(CountriesActions.loadCountries, (state) => ({ ...state, loading: true, error: null })),
    on(CountriesActions.loadCountriesSuccess, (state, { countries }) => ({
        ...state,
        countries,
        loaded: true,
        loading: false
    })),
    on(CountriesActions.loadCountriesFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
