import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, usersAdapter } from '../reducers/users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const { selectAll: selectAllUsers, selectEntities: selectUserEntities } =
    usersAdapter.getSelectors(createSelector(selectUsersState, (state) => state.users));

export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);

export const selectUsersError = createSelector(selectUsersState, (state) => state.error);

export const selectSelectedUser = createSelector(selectUsersState, (state) => state.selectedUser);

export const selectUserById = (id: number) =>
    createSelector(selectAllUsers, (users) => users.find((u) => u.id === id) ?? null);
