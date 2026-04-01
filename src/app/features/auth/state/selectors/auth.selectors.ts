import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthReducerState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthReducerState>('auth');

// Logged User
export const selectLoggedUser = createSelector(
    selectAuthState, 
    (state) => state.loggedUser
);

// Company
export const selectUserCompany = createSelector(
    selectAuthState, 
    (state) => state.userCompany
);

// Menu
export const selectUserMenu = createSelector(
    selectAuthState, 
    (state) => state.userMenu
);

// Permissions
export const selectUserPermissions = createSelector(
    selectAuthState, 
    (state) => state.userPermissions
);

// Authentication Status
export const selectIsAuthenticated = createSelector(
    selectLoggedUser, 
    (user) => {
        if (!user) return false;
        
        // Verificar si el token no ha expirado
        const now = Date.now() / 1000; // Convert to seconds
        return user.expiredsAt > now;
    }
);

export const selectAuthToken = createSelector(
    selectLoggedUser, 
    (user) => user?.token || null
);

export const selectTokenExpirationTime = createSelector(
    selectLoggedUser, 
    (user) => user?.expiredsAt || null
);

// Loading and Error States
export const selectAuthLoading = createSelector(
    selectAuthState, 
    (state) => state.loading
);

export const selectAuthError = createSelector(
    selectAuthState, 
    (state) => state.error
);

// Helper selectors
export const selectUserDisplayName = createSelector(
    selectLoggedUser,
    (user) => user ? `${user.names} ${user.lastNames}` : ''
);

export const selectHasPermission = (permissionCode: string) => createSelector(
    selectUserPermissions,
    (permissions) => permissions.some(p => p.code === permissionCode)
);

export const selectHasModuleAccess = (modulePrefix: string) => createSelector(
    selectUserPermissions,
    (permissions) => permissions.some(p => p.code.startsWith(modulePrefix))
);
