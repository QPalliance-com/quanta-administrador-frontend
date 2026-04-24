import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Licence } from '@/core/models/licence.model';
import { LicencesActions } from '../actions/licences.actions';

export interface LicencesState {
    licences: EntityState<Licence>;
    selectedLicence: Licence | null;
    loading: boolean;
    error: string | null;
}

export const licencesAdapter: EntityAdapter<Licence> = createEntityAdapter<Licence>();

export const initialState: LicencesState = {
    licences: licencesAdapter.getInitialState(),
    selectedLicence: null,
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

    on(LicencesActions.loadLicence, (state) => ({ ...state, loading: true, error: null })),
    on(LicencesActions.loadLicenceSuccess, (state, { licence }) => ({
        ...state,
        selectedLicence: licence,
        loading: false
    })),
    on(LicencesActions.loadLicenceFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicencesActions.createLicence, (state) => ({ ...state, loading: true, error: null })),
    on(LicencesActions.createLicenceSuccess, (state, { licence }) => ({
        ...state,
        licences: licencesAdapter.addOne(licence, state.licences),
        loading: false
    })),
    on(LicencesActions.createLicenceFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicencesActions.updateLicence, (state) => ({ ...state, loading: true, error: null })),
    on(LicencesActions.updateLicenceSuccess, (state, { licence }) => ({
        ...state,
        licences: licencesAdapter.updateOne({ id: licence.id, changes: licence }, state.licences),
        selectedLicence: state.selectedLicence?.id === licence.id ? licence : state.selectedLicence,
        loading: false
    })),
    on(LicencesActions.updateLicenceFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicencesActions.deleteLicence, (state) => ({ ...state, loading: true, error: null })),
    on(LicencesActions.deleteLicenceSuccess, (state, { id }) => ({
        ...state,
        licences: licencesAdapter.removeOne(id, state.licences),
        selectedLicence: state.selectedLicence?.id === id ? null : state.selectedLicence,
        loading: false
    })),
    on(LicencesActions.deleteLicenceFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicencesActions.clearSelectedLicence, (state) => ({ ...state, selectedLicence: null })),
    on(LicencesActions.clearError, (state) => ({ ...state, error: null }))
);
