import { createReducer, on } from '@ngrx/store';
import { MercadoPagoPayment, MercadoPagoPaymentFilters } from '@/core/models';
import { MercadoPagoPaymentsActions } from '../actions/mercadopago-payments.actions';

export interface MercadoPagoPaymentsState {
    results: MercadoPagoPayment[];
    total: number;
    page: number;
    pageSize: number;
    filters: MercadoPagoPaymentFilters | null; // última búsqueda: sirve para reintentar y para paginar
    loading: boolean;
    error: string | null;
}

export const initialState: MercadoPagoPaymentsState = {
    results: [],
    total: 0,
    page: 1,
    pageSize: 20,
    filters: null,
    loading: false,
    error: null
};

export const mercadoPagoPaymentsReducer = createReducer(
    initialState,
    on(MercadoPagoPaymentsActions.search, (state, { filters }) => ({
        ...state,
        filters,
        page: filters.page,
        pageSize: filters.pageSize,
        loading: true,
        error: null
    })),
    on(MercadoPagoPaymentsActions.searchSuccess, (state, { result }) => ({
        ...state,
        results: result.results,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        loading: false
    })),
    // Tras un error se vacía la tabla: no se deja a la vista una página que ya no corresponde a los filtros
    on(MercadoPagoPaymentsActions.searchFailure, (state, { error }) => ({ ...state, results: [], total: 0, error, loading: false }))
);
