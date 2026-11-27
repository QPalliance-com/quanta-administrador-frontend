import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HealthEntityType } from '@/core/models/health-entity-type.model';
import { HealthEntityTypeActions } from '../actions/health-entity-type.actions';

export interface HealthEntityTypeState {
    healthEntityTypes: EntityState<HealthEntityType>;
    loadedCountries: string[];
    loading: boolean;
    error: string | null;
}

export const healthEntityTypeAdapter: EntityAdapter<HealthEntityType> = createEntityAdapter<HealthEntityType>();

export const initialHealthEntityTypeState: HealthEntityTypeState = {
    healthEntityTypes: healthEntityTypeAdapter.getInitialState(),
    loadedCountries: [],
    loading: false,
    error: null
};

export const healthEntityTypeReducer = createReducer(
    initialHealthEntityTypeState,
    on(HealthEntityTypeActions.loadHealthEntityTypes, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(HealthEntityTypeActions.loadHealthEntityTypesSuccess, (state, { countryCode, healthEntityTypes }) => ({
        ...state,
        healthEntityTypes: healthEntityTypeAdapter.upsertMany(healthEntityTypes, state.healthEntityTypes),
        loadedCountries: state.loadedCountries.includes(countryCode)
            ? state.loadedCountries
            : [...state.loadedCountries, countryCode],
        loading: false
    })),
    // La lista queda vacía para ese país y el formulario sigue usable; el backend valida al guardar
    on(HealthEntityTypeActions.loadHealthEntityTypesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
