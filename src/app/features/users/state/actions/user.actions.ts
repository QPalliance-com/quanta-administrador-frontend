import { createAction, props } from '@ngrx/store';
import { User } from '@/core/models';

export const initUsers = createAction('[Users] Init');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: any }>());

export const loadUser = createAction('[Users] Load User', props<{ id: number }>());
export const loadUserSuccess = createAction('[Users] Load User Success', props<{ user: User | undefined }>());
export const loadUserFailure = createAction('[Users] Load User Failure', props<{ error: any }>());

export const createUser = createAction('[Users] Create User', props<{ user: Partial<User> }>());
export const createUserSuccess = createAction('[Users] Create User Success', props<{ user: User }>());
export const createUserFailure = createAction('[Users] Create User Failure', props<{ error: any }>());

export const updateUser = createAction('[Users] Update User', props<{ id: number; user: Partial<User> }>());
export const updateUserSuccess = createAction('[Users] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Users] Update User Failure', props<{ error: any }>());

export const updateUserStatus = createAction('[Users] Update User Status', props<{ id: number; status: 'active' | 'inactive' }>());
export const updateUserStatusSuccess = createAction('[Users] Update User Status Success', props<{ user: User }>());
export const updateUserStatusFailure = createAction('[Users] Update User Status Failure', props<{ error: any }>());

export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[Users] Delete User Failure', props<{ error: any }>());
