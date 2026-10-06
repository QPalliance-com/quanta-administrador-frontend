import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MercadoPagoPaymentsState } from '../reducers/mercadopago-payments.reducer';

export const selectMercadoPagoPaymentsState = createFeatureSelector<MercadoPagoPaymentsState>('mercadoPagoPayments');

export const selectMpPayments = createSelector(selectMercadoPagoPaymentsState, (state) => state.results);

export const selectMpTotal = createSelector(selectMercadoPagoPaymentsState, (state) => state.total);

export const selectMpPage = createSelector(selectMercadoPagoPaymentsState, (state) => state.page);

export const selectMpPageSize = createSelector(selectMercadoPagoPaymentsState, (state) => state.pageSize);

export const selectMpFilters = createSelector(selectMercadoPagoPaymentsState, (state) => state.filters);

export const selectMpLoading = createSelector(selectMercadoPagoPaymentsState, (state) => state.loading);

export const selectMpError = createSelector(selectMercadoPagoPaymentsState, (state) => state.error);
