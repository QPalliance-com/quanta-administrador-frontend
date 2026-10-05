import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LicenceLotsState, licenceLotsAdapter } from '../reducers/licence-lots.reducer';

export const selectLicenceLotsState = createFeatureSelector<LicenceLotsState>('licenceLots');

export const { selectAll: selectAllLicenceLots } = licenceLotsAdapter.getSelectors(
    createSelector(selectLicenceLotsState, (state) => state.lots)
);

export const selectProfileSummary = createSelector(selectLicenceLotsState, (state) => state.profileSummary);

export const selectLicenceLotsLoading = createSelector(selectLicenceLotsState, (state) => state.loading);

export const selectLicenceLotsError = createSelector(selectLicenceLotsState, (state) => state.error);

export const selectLicenceLotsCompanyId = createSelector(selectLicenceLotsState, (state) => state.companyId);
