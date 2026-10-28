import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HealthEntityTypeState, healthEntityTypeAdapter } from '../reducers/health-entity-type.reducer';

export const selectHealthEntityTypeState = createFeatureSelector<HealthEntityTypeState>('healthEntityTypes');

export const { selectAll: selectAllHealthEntityTypes } = healthEntityTypeAdapter.getSelectors(
    createSelector(selectHealthEntityTypeState, (state) => state.healthEntityTypes)
);

export const selectLoadedHealthEntityCountries = createSelector(
    selectHealthEntityTypeState,
    (state) => state.loadedCountries
);

export const selectHealthEntityTypesLoading = createSelector(
    selectHealthEntityTypeState,
    (state) => state.loading
);

export const selectHealthEntityTypesError = createSelector(
    selectHealthEntityTypeState,
    (state) => state.error
);

export const selectHealthEntityTypesByCountry = (countryCode: string | null) =>
    createSelector(selectAllHealthEntityTypes, (types) =>
        countryCode ? types.filter((t) => t.countryCode === countryCode) : []
    );
