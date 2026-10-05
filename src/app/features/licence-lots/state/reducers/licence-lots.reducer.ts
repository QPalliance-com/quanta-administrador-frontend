import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LicenceLot, ProfileSummary } from '@/core/models';
import { LicenceLotsActions } from '../actions/licence-lots.actions';

export interface LicenceLotsState {
    lots: EntityState<LicenceLot>;
    profileSummary: ProfileSummary[];
    companyId: number | null;
    loading: boolean;
    error: string | null;
}

export const licenceLotsAdapter: EntityAdapter<LicenceLot> = createEntityAdapter<LicenceLot>();

export const initialState: LicenceLotsState = {
    lots: licenceLotsAdapter.getInitialState(),
    profileSummary: [],
    companyId: null,
    loading: false,
    error: null
};

export const licenceLotsReducer = createReducer(
    initialState,

    // Al cambiar de empresa se limpia el listado para no mostrar lotes ajenos mientras carga
    on(LicenceLotsActions.loadList, (state, { companyId }) => ({
        ...state,
        ...(state.companyId !== companyId
            ? { lots: licenceLotsAdapter.removeAll(state.lots), profileSummary: [] }
            : {}),
        companyId,
        loading: true,
        error: null
    })),
    on(LicenceLotsActions.loadListSuccess, (state, { data }) => ({
        ...state,
        lots: licenceLotsAdapter.setAll(data.lots, state.lots),
        profileSummary: data.profileSummary,
        loading: false
    })),
    on(LicenceLotsActions.loadListFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
