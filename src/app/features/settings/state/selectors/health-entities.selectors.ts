import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HealthEntitiesState, healthEntitiesAdapter } from '../reducers/health-entities.reducer';

export const selectHealthEntitiesState = createFeatureSelector<HealthEntitiesState>('healthEntities');

export const { selectAll: selectAllHealthEntities } = healthEntitiesAdapter.getSelectors(
    createSelector(selectHealthEntitiesState, (state) => state.healthEntities)
);

export const selectHealthEntitiesLoading = createSelector(selectHealthEntitiesState, (state) => state.loading);

export const selectHealthEntitiesError = createSelector(selectHealthEntitiesState, (state) => state.error);

export const selectHealthEntitiesLastQuery = createSelector(selectHealthEntitiesState, (state) => state.lastQuery);
