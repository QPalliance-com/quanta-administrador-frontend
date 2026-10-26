import { createReducer, on } from '@ngrx/store';
import { PaymentTypeCatalog, PeriodCatalog } from '@/core/models';
import { CatalogsActions } from '../actions/catalogs.actions';

export interface CatalogsState {
    paymentTypes: PaymentTypeCatalog[];
    periods: PeriodCatalog[];
    loaded: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: CatalogsState = {
    paymentTypes: [],
    periods: [],
    loaded: false,
    loading: false,
    error: null
};

export const catalogsReducer = createReducer(
    initialState,
    on(CatalogsActions.load, (state) => ({ ...state, loading: true, error: null })),
    on(CatalogsActions.loadSuccess, (state, { paymentTypes, periods }) => ({
        ...state,
        paymentTypes,
        periods,
        loaded: true,
        loading: false
    })),
    on(CatalogsActions.loadFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
