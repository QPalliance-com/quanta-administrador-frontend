import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesState } from '../reducers/invoices.reducer';

export const selectInvoicesState = createFeatureSelector<InvoicesState>('licenceInvoices');

export const selectInvoices = createSelector(selectInvoicesState, (state) => state.invoices);

export const selectInvoicesLoading = createSelector(selectInvoicesState, (state) => state.loading);

export const selectInvoicesError = createSelector(selectInvoicesState, (state) => state.error);

export const selectInvoicesCompanyId = createSelector(selectInvoicesState, (state) => state.companyId);

export const selectDownloadingInvoiceId = createSelector(selectInvoicesState, (state) => state.downloadingId);
