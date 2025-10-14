import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, adapter } from '../reducers/user.reducer';

export const selectSettingsState = createFeatureSelector<any>('settings');
export const selectUserState = createSelector(selectSettingsState, (state) => state.users);

export const { selectAll: selectAllUsers, selectIds: selectUserIds } = adapter.getSelectors(selectUserState);
export const selectCurrentUserId = createSelector(selectUserState, (state: UserState) => state?.selectedUserId);
export const selectCurrentUser = createSelector(selectAllUsers, selectCurrentUserId, (users, selectedId) => users?.find((u) => u.id === selectedId) || null);
export const selectUsersLoading = createSelector(selectUserState, (state: UserState) => state?.loading);
export const selectUsersError = createSelector(selectUserState, (state: UserState) => state?.error);
