import { createReducer, on } from '@ngrx/store';
import { PaymentTypeCatalog, PeriodCatalog } from '@/core/models';
import { CatalogsActions } from '../actions/catalogs.actions';

export interface CatalogsState {
    paymentTypes: PaymentTypeCatalog[];
    paymentTypesCountry: string | null;
    periods: PeriodCatalog[];
    periodsLoaded: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: CatalogsState = {
    paymentTypes: [],
    paymentTypesCountry: null,
    periods: [],
    periodsLoaded: false,
    loading: false,
    error: null
};

export const catalogsReducer = createReducer(
    initialState,
    // Al pedir otro país se vacía la lista para no ofrecer por un instante formas de pago del país anterior
    on(CatalogsActions.loadPaymentTypes, (state, { countryCode }) =>
        state.paymentTypesCountry === countryCode
            ? state
            : { ...state, paymentTypes: [], paymentTypesCountry: null, loading: !!countryCode, error: null }
    ),
    on(CatalogsActions.loadPaymentTypesSuccess, (state, { countryCode, paymentTypes }) => ({
        ...state,
        paymentTypes,
        paymentTypesCountry: countryCode,
        loading: false
    })),
    on(CatalogsActions.loadPeriods, (state) => ({ ...state, loading: true, error: null })),
    on(CatalogsActions.loadPeriodsSuccess, (state, { periods }) => ({ ...state, periods, periodsLoaded: true, loading: false })),
    on(CatalogsActions.loadFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
