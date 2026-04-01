import { createReducer, on } from '@ngrx/store';
import { LoggedUser } from '@/core/models/auth.model';
import { Permission } from '@/core/models/permission.model';
import { AppMenu } from '@/core/models/menu.model';
import { Company } from '@/core/models/company.model';
import * as AuthActions from '../actions/auth.actions';

export interface AuthReducerState {
    loggedUser: LoggedUser | null;
    userCompany: Company | null;
    userPermissions: Permission[];
    userMenu: AppMenu[];
    loading: boolean;
    error: string | null;
}

export const initialState: AuthReducerState = {
    loggedUser: null,
    userCompany: null,
    userPermissions: [],
    userMenu: [],
    loading: false,
    error: null
};

export const authReducer = createReducer(
    initialState,

    // Initialize Auth
    on(AuthActions.initializeAuth, (state) => ({
        ...state,
        loading: true
    })),

    on(AuthActions.resetAuthState, () => ({
        ...initialState
    })),

    // Login
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.loginSuccess, (state, { loginData }) => ({
        ...state,
        loading: false,
        loggedUser: loginData.userData,
        userCompany: loginData.userCompany,
        userPermissions: loginData.userPermissions,
        userMenu: loginData.userMenu,
        error: null
    })),

    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Auto Login
    on(AuthActions.autoLogin, (state) => ({
        ...state,
        loading: true
    })),

    on(AuthActions.autoLoginSuccess, (state, { loginData }) => ({
        ...state,
        loading: false,
        loggedUser: loginData.userData,
        userCompany: loginData.userCompany,
        userPermissions: loginData.userPermissions,
        userMenu: loginData.userMenu,
        error: null
    })),

    on(AuthActions.autoLoginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Logout
    on(AuthActions.logout, (state) => ({
        ...state,
        loading: true
    })),

    on(AuthActions.logoutSuccess, () => ({
        ...initialState
    })),

    on(AuthActions.logoutFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Session Management
    on(AuthActions.setSession, (state, { loginData }) => ({
        ...state,
        loggedUser: loginData.userData,
        userCompany: loginData.userCompany,
        userPermissions: loginData.userPermissions,
        userMenu: loginData.userMenu
    })),

    on(AuthActions.clearSession, () => ({
        ...initialState
    })),

    on(AuthActions.sessionExpired, (state) => ({
        ...initialState,
        error: 'Sesión expirada. Por favor, inicie sesión nuevamente.'
    })),

    // Error Management
    on(AuthActions.setError, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    on(AuthActions.clearError, (state) => ({
        ...state,
        error: null
    })),

    // Loading States
    on(AuthActions.setLoading, (state, { loading }) => ({
        ...state,
        loading
    }))
);
