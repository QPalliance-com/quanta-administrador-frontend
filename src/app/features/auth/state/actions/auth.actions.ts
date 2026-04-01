import { createAction, props } from '@ngrx/store';
import { LoginData } from '@/core/models/login-response.model';

// Login
export const login = createAction(
    '[Auth] Login', 
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success', 
    props<{ loginData: LoginData }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure', 
    props<{ error: string }>()
);

// Auto Login (from stored session)
export const autoLogin = createAction('[Auth] Auto Login');

export const autoLoginSuccess = createAction(
    '[Auth] Auto Login Success', 
    props<{ loginData: LoginData }>()
);

export const autoLoginFailure = createAction(
    '[Auth] Auto Login Failure', 
    props<{ error: string }>()
);

// Logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
    '[Auth] Logout Failure', 
    props<{ error: string }>()
);

// Session Management
export const setSession = createAction(
    '[Auth] Set Session', 
    props<{ loginData: LoginData }>()
);

export const clearSession = createAction('[Auth] Clear Session');

export const sessionExpired = createAction('[Auth] Session Expired');

// Error Management
export const clearError = createAction('[Auth] Clear Error');

export const setError = createAction(
    '[Auth] Set Error', 
    props<{ error: string }>()
);

// Loading States
export const setLoading = createAction(
    '[Auth] Set Loading', 
    props<{ loading: boolean }>()
);

// Initialize Auth State
export const initializeAuth = createAction('[Auth] Initialize Auth');

export const resetAuthState = createAction('[Auth] Reset Auth State');
