import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LicenseConfigState } from '../reducers/license-config.reducer';

export const selectLicenseConfigState = createFeatureSelector<LicenseConfigState>('licenseConfig');

export const selectGlobalLicenseConfig = createSelector(selectLicenseConfigState, (state) => state.global);

export const selectLicenseConfigOverrides = createSelector(selectLicenseConfigState, (state) => state.overrides);

export const selectLoadingGlobalConfig = createSelector(selectLicenseConfigState, (state) => state.loadingGlobal);

export const selectLoadingOverrides = createSelector(selectLicenseConfigState, (state) => state.loadingOverrides);

export const selectLicenseConfigSaving = createSelector(selectLicenseConfigState, (state) => state.saving);
