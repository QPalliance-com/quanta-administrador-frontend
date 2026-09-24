import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Licence } from '@/core/models/licence.model';
import { LicencesActions } from '../actions/licences.actions';

export interface LicencesState {
    licences: EntityState<Licence>;
    loading: boolean;
    error: string | null;
}

export const licencesAdapter: EntityAdapter<Licence> = createEntityAdapter<Licence>();

export const initialState: LicencesState = {
    licences: licencesAdapter.getInitialState(),
    loading: false,
    error: null
};

export const licencesReducer = createReducer(
    initialState,

    on(LicencesActions.loadLicences, (state) => ({ ...state, loading: true, error: null })),
    on(LicencesActions.loadLicencesSuccess, (state, { licences }) => ({
        ...state,
        licences: licencesAdapter.setAll(licences, state.licences),
        loading: false
    })),
    on(LicencesActions.loadLicencesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicencesActions.updateLicencePrice, (state) => ({ ...state, loading: true, error: null })),
    on(LicencesActions.updateLicencePriceSuccess, (state, { id, amount }) => ({
        ...state,
        licences: licencesAdapter.updateOne({ id, changes: { amountUsd: amount } }, state.licences),
        loading: false
    })),
    on(LicencesActions.updateLicencePriceFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicencesActions.clearError, (state) => ({ ...state, error: null }))
);
