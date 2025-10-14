import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from '../reducers/menu.reducer';

export const selectMenuState = createFeatureSelector<MenuState>('menu');

export const selectMenuItems = createSelector(selectMenuState, (state: MenuState) => state.menu);

export const selectMenuLoading = createSelector(selectMenuState, (state: MenuState) => state.loading);

export const selectMenuError = createSelector(selectMenuState, (state: MenuState) => state.error);
