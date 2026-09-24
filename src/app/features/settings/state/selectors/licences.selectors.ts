import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LicencesState, licencesAdapter } from '../reducers/licences.reducer';

export const selectLicencesState = createFeatureSelector<LicencesState>('licences');

export const { selectAll: selectAllLicences, selectEntities: selectLicenceEntities } =
    licencesAdapter.getSelectors(createSelector(selectLicencesState, (state) => state.licences));

export const selectLicencesLoading = createSelector(selectLicencesState, (state) => state.loading);

export const selectLicencesError = createSelector(selectLicencesState, (state) => state.error);
