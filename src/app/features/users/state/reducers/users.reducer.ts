import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@/core/models/user.model';
import { UsersActions } from '../actions/users.actions';

export interface UsersState {
    users: EntityState<User>;
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = {
    users: usersAdapter.getInitialState(),
    selectedUser: null,
    loading: false,
    error: null
};

export const usersReducer = createReducer(
    initialState,

    on(UsersActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: usersAdapter.setAll(users, state.users),
        loading: false
    })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(UsersActions.loadUser, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        selectedUser: user,
        loading: false
    })),
    on(UsersActions.loadUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(UsersActions.createUser, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.createUserSuccess, (state, { user }) => ({
        ...state,
        users: usersAdapter.addOne(user, state.users),
        loading: false
    })),
    on(UsersActions.createUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(UsersActions.updateUser, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        users: usersAdapter.updateOne({ id: user.id, changes: user }, state.users),
        selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
        loading: false
    })),
    on(UsersActions.updateUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(UsersActions.updateUserStatus, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.updateUserStatusSuccess, (state, { user }) => ({
        ...state,
        users: usersAdapter.updateOne({ id: user.id, changes: user }, state.users),
        loading: false
    })),
    on(UsersActions.updateUserStatusFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(UsersActions.deleteUser, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.deleteUserSuccess, (state, { id }) => ({
        ...state,
        users: usersAdapter.removeOne(id, state.users),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        loading: false
    })),
    on(UsersActions.deleteUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(UsersActions.clearSelectedUser, (state) => ({ ...state, selectedUser: null })),
    on(UsersActions.clearError, (state) => ({ ...state, error: null }))
);
