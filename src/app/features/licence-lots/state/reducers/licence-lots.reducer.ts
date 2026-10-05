import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LicenceLot, ProfileSummary, PseCheckoutResult } from '@/core/models';
import { LicenceLotsActions } from '../actions/licence-lots.actions';

export interface LicenceLotsState {
    lots: EntityState<LicenceLot>;
    profileSummary: ProfileSummary[];
    companyId: number | null;
    loading: boolean;
    saving: boolean; // mutaciones (crear, agregar, extender, migrar)
    pseCheckout: PseCheckoutResult | null; // último link PSE generado, se limpia al abrir el drawer
    pseLoading: boolean;
    error: string | null;
}

export const licenceLotsAdapter: EntityAdapter<LicenceLot> = createEntityAdapter<LicenceLot>();

export const initialState: LicenceLotsState = {
    lots: licenceLotsAdapter.getInitialState(),
    profileSummary: [],
    companyId: null,
    loading: false,
    saving: false,
    pseCheckout: null,
    pseLoading: false,
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
    on(LicenceLotsActions.loadListFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(
        LicenceLotsActions.create,
        LicenceLotsActions.addLicences,
        LicenceLotsActions.extend,
        LicenceLotsActions.scheduleMigration,
        (state) => ({ ...state, saving: true })
    ),
    on(
        LicenceLotsActions.createSuccess,
        LicenceLotsActions.createFailure,
        LicenceLotsActions.addLicencesSuccess,
        LicenceLotsActions.addLicencesFailure,
        LicenceLotsActions.extendSuccess,
        LicenceLotsActions.extendFailure,
        LicenceLotsActions.scheduleMigrationSuccess,
        LicenceLotsActions.scheduleMigrationFailure,
        (state) => ({ ...state, saving: false })
    ),

    on(LicenceLotsActions.generatePseLink, (state) => ({ ...state, pseLoading: true, pseCheckout: null })),
    on(LicenceLotsActions.generatePseLinkSuccess, (state, { result }) => ({ ...state, pseLoading: false, pseCheckout: result })),
    on(LicenceLotsActions.generatePseLinkFailure, (state) => ({ ...state, pseLoading: false })),
    on(LicenceLotsActions.clearPseLink, (state) => ({ ...state, pseCheckout: null }))
);
