import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LicenceLotsState, licenceLotsAdapter } from '../reducers/licence-lots.reducer';

export const selectLicenceLotsState = createFeatureSelector<LicenceLotsState>('licenceLots');

export const { selectAll: selectAllLicenceLots } = licenceLotsAdapter.getSelectors(
    createSelector(selectLicenceLotsState, (state) => state.lots)
);

export const selectProfileSummary = createSelector(selectLicenceLotsState, (state) => state.profileSummary);

export const selectLicenceLotsLoading = createSelector(selectLicenceLotsState, (state) => state.loading);

export const selectLicenceLotsSaving = createSelector(selectLicenceLotsState, (state) => state.saving);

export const selectPseCheckout = createSelector(selectLicenceLotsState, (state) => state.pseCheckout);

export const selectPsePaymentUrl = createSelector(selectPseCheckout, (checkout) => checkout?.paymentUrl ?? null);

export const selectPseLoading = createSelector(selectLicenceLotsState, (state) => state.pseLoading);

export const selectLicenceLotsError = createSelector(selectLicenceLotsState, (state) => state.error);

export const selectLicenceLotsCompanyId = createSelector(selectLicenceLotsState, (state) => state.companyId);
