import { createReducer, on } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { MenuActions } from '../actions/menu.actions';

export interface MenuState {
    menu: MenuItem[];
    loading: boolean;
    error: any;
}

export const initialState: MenuState = {
    menu: [],
    loading: false,
    error: null
};

export const menuReducer = createReducer(
    initialState,
    on(MenuActions.loadMenu, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(MenuActions.loadMenuSuccess, (state, { menu }) => ({
        ...state,
        menu,
        loading: false
    })),
    on(MenuActions.loadMenuFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
