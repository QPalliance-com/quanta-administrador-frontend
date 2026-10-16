import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IdentificationType } from '@/core/models/identification-type.model';
import { IdentificationTypeActions } from '../actions/identification-type.actions';

export interface IdentificationTypeState {
    identificationTypes: EntityState<IdentificationType>;
    loadedCountries: string[];
    loading: boolean;
    error: string | null;
}

export const identificationTypeAdapter: EntityAdapter<IdentificationType> = createEntityAdapter<IdentificationType>();

export const initialIdentificationTypeState: IdentificationTypeState = {
    identificationTypes: identificationTypeAdapter.getInitialState(),
    loadedCountries: [],
    loading: false,
    error: null
};

export const identificationTypeReducer = createReducer(
    initialIdentificationTypeState,
    on(IdentificationTypeActions.loadIdentificationTypes, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(IdentificationTypeActions.loadIdentificationTypesSuccess, (state, { countryCode, identificationTypes }) => ({
        ...state,
        identificationTypes: identificationTypeAdapter.upsertMany(identificationTypes, state.identificationTypes),
        loadedCountries: state.loadedCountries.includes(countryCode)
            ? state.loadedCountries
            : [...state.loadedCountries, countryCode],
        loading: false
    })),
    // La lista queda vacía para ese país y el formulario sigue usable; el backend valida al guardar
    on(IdentificationTypeActions.loadIdentificationTypesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
