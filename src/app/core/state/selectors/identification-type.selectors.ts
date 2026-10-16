import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdentificationTypeState, identificationTypeAdapter } from '../reducers/identification-type.reducer';

export const selectIdentificationTypeState = createFeatureSelector<IdentificationTypeState>('identificationTypes');

export const { selectAll: selectAllIdentificationTypes } = identificationTypeAdapter.getSelectors(
    createSelector(selectIdentificationTypeState, (state) => state.identificationTypes)
);

export const selectLoadedIdentificationCountries = createSelector(
    selectIdentificationTypeState,
    (state) => state.loadedCountries
);

export const selectIdentificationTypesLoading = createSelector(
    selectIdentificationTypeState,
    (state) => state.loading
);

export const selectIdentificationTypesError = createSelector(
    selectIdentificationTypeState,
    (state) => state.error
);

export const selectIdentificationTypesByCountry = (countryCode: string | null) =>
    createSelector(selectAllIdentificationTypes, (types) =>
        countryCode ? types.filter((t) => t.countryCode === countryCode) : []
    );
