import { createReducer, on } from '@ngrx/store';
import { BillingInvoice } from '@/core/models';
import { InvoicesActions } from '../actions/invoices.actions';

export interface InvoicesState {
    invoices: BillingInvoice[];
    companyId: number | null;
    loading: boolean;
    error: string | null;
    downloadingId: number | null; // factura cuyo PDF se está descargando (deshabilita su botón)
}

export const initialState: InvoicesState = {
    invoices: [],
    companyId: null,
    loading: false,
    error: null,
    downloadingId: null
};

export const invoicesReducer = createReducer(
    initialState,

    // Al cambiar de empresa se limpia el listado para no mostrar facturas ajenas mientras carga
    on(InvoicesActions.loadInvoices, (state, { companyId }) => ({
        ...state,
        invoices: state.companyId !== companyId ? [] : state.invoices,
        companyId,
        loading: true,
        error: null
    })),
    on(InvoicesActions.loadInvoicesSuccess, (state, { invoices }) => ({ ...state, invoices, loading: false })),
    on(InvoicesActions.loadInvoicesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(InvoicesActions.downloadInvoice, (state, { invoiceId }) => ({ ...state, downloadingId: invoiceId })),
    on(InvoicesActions.downloadInvoiceSuccess, InvoicesActions.downloadInvoiceFailure, (state) => ({
        ...state,
        downloadingId: null
    }))
);
