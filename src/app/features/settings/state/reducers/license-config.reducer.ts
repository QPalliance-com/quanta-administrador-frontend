import { createReducer, on } from '@ngrx/store';
import { LicenseConfig, LicenseConfigOverride } from '@/core/models';
import { LicenseConfigActions } from '../actions/license-config.actions';

export interface LicenseConfigState {
    global: LicenseConfig | null;
    overrides: LicenseConfigOverride[];
    loadingGlobal: boolean;
    loadingOverrides: boolean;
    saving: boolean;
    error: string | null;
}

export const initialState: LicenseConfigState = {
    global: null,
    overrides: [],
    loadingGlobal: false,
    loadingOverrides: false,
    saving: false,
    error: null
};

export const licenseConfigReducer = createReducer(
    initialState,

    on(LicenseConfigActions.loadGlobal, (state) => ({ ...state, loadingGlobal: true, error: null })),
    on(LicenseConfigActions.loadGlobalSuccess, (state, { config }) => ({ ...state, global: config, loadingGlobal: false })),
    on(LicenseConfigActions.loadGlobalFailure, (state, { error }) => ({ ...state, error, loadingGlobal: false })),

    on(LicenseConfigActions.loadOverrides, (state) => ({ ...state, loadingOverrides: true, error: null })),
    on(LicenseConfigActions.loadOverridesSuccess, (state, { overrides }) => ({ ...state, overrides, loadingOverrides: false })),
    on(LicenseConfigActions.loadOverridesFailure, (state, { error }) => ({ ...state, error, loadingOverrides: false })),

    on(LicenseConfigActions.update, (state) => ({ ...state, saving: true })),
    on(LicenseConfigActions.updateSuccess, LicenseConfigActions.updateFailure, (state) => ({ ...state, saving: false }))
);
