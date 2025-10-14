import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from '@/core/models';
import * as userActions from '../actions/user.actions';

export interface UserState extends EntityState<User> {
    selectedUserId: number | null;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user.id
});

export const initialState: UserState = adapter.getInitialState({
    selectedUserId: null,
    loading: false,
    error: null
});

export const userReducer = createReducer(
    initialState,
    on(userActions.initUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(userActions.loadUsersSuccess, (state, { users }) =>
        adapter.setAll(users, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(userActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(userActions.loadUser, (state, { id }) => ({
        ...state,
        selectedUserId: id,
        loading: true,
        error: null
    })),
    on(userActions.loadUserSuccess, (state, { user }) => {
        // Si el usuario existe, lo actualiza/agrega al state
        return user ? adapter.upsertOne(user, { ...state, loading: false, error: null }) : { ...state, loading: false, error: null };
    }),
    on(userActions.loadUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(userActions.updateUserSuccess, (state, { user }) => adapter.upsertOne(user, { ...state, loading: false, error: null })),
    on(userActions.updateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
