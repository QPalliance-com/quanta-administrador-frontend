import { createReducer, on } from '@ngrx/store';
import { ExpiringLot } from '@/core/models';
import { ExpiringLotsActions } from '../actions/expiring-lots.actions';

export interface ExpiringLotsState {
    lots: ExpiringLot[];
    loaded: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: ExpiringLotsState = {
    lots: [],
    loaded: false,
    loading: false,
    error: null
};

export const expiringLotsReducer = createReducer(
    initialState,
    on(ExpiringLotsActions.loadExpiringLots, (state) => ({ ...state, loading: true, error: null })),
    on(ExpiringLotsActions.loadExpiringLotsSuccess, (state, { lots }) => ({ ...state, lots, loaded: true, loading: false })),
    on(ExpiringLotsActions.loadExpiringLotsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
