import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HealthEntity, HealthEntityQuery } from '@/core/models/health-entity.model';
import { HealthEntitiesActions } from '../actions/health-entities.actions';

export interface HealthEntitiesState {
    healthEntities: EntityState<HealthEntity>;
    loading: boolean;
    error: string | null;
    lastQuery: HealthEntityQuery | null;
}

export const healthEntitiesAdapter: EntityAdapter<HealthEntity> = createEntityAdapter<HealthEntity>();

export const initialHealthEntitiesState: HealthEntitiesState = {
    healthEntities: healthEntitiesAdapter.getInitialState(),
    loading: false,
    error: null,
    lastQuery: null
};

export const healthEntitiesReducer = createReducer(
    initialHealthEntitiesState,

    on(HealthEntitiesActions.loadList, (state, { query }) => ({ ...state, loading: true, error: null, lastQuery: query })),
    on(HealthEntitiesActions.loadListSuccess, (state, { items }) => ({
        ...state,
        healthEntities: healthEntitiesAdapter.setAll(items, state.healthEntities),
        loading: false
    })),
    on(HealthEntitiesActions.loadListFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(HealthEntitiesActions.create, HealthEntitiesActions.update, HealthEntitiesActions.delete, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(HealthEntitiesActions.createSuccess, HealthEntitiesActions.updateSuccess, (state) => ({ ...state, loading: false })),
    on(HealthEntitiesActions.deleteSuccess, (state, { id }) => ({
        ...state,
        healthEntities: healthEntitiesAdapter.removeOne(id, state.healthEntities),
        loading: false
    })),
    on(
        HealthEntitiesActions.createFailure,
        HealthEntitiesActions.updateFailure,
        HealthEntitiesActions.deleteFailure,
        (state, { error }) => ({ ...state, error, loading: false })
    ),

    on(HealthEntitiesActions.resetState, () => initialHealthEntitiesState)
);
