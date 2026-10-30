import { createReducer, on } from '@ngrx/store';
import { AccountingEnvironment, AccountingProviderConfig, AccountingProviderOption } from '@/core/models';
import { AccountingProviderActions } from '../actions/accounting-provider.actions';

export interface AccountingProviderState {
    providers: AccountingProviderOption[];
    config: AccountingProviderConfig | null; // null = empresa sin proveedor configurado
    companyId: number | null;
    loading: boolean;
    loadingProviders: boolean;
    error: string | null;
    saving: AccountingEnvironment | null;
    saveError: { environment: AccountingEnvironment; message: string } | null;
}

export const initialState: AccountingProviderState = {
    providers: [],
    config: null,
    companyId: null,
    loading: false,
    loadingProviders: false,
    error: null,
    saving: null,
    saveError: null
};

export const accountingProviderReducer = createReducer(
    initialState,

    // Al cambiar de empresa se descarta la config anterior para no mostrar el proveedor de otra
    on(AccountingProviderActions.loadConfig, (state, { companyId }) => ({
        ...state,
        config: state.companyId !== companyId ? null : state.config,
        companyId,
        loading: true,
        error: null
    })),
    on(AccountingProviderActions.loadConfigSuccess, (state, { config }) => ({ ...state, config, loading: false })),
    on(AccountingProviderActions.loadConfigFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(AccountingProviderActions.loadProviders, (state) => ({ ...state, loadingProviders: true })),
    on(AccountingProviderActions.loadProvidersSuccess, (state, { providers }) => ({ ...state, providers, loadingProviders: false })),
    on(AccountingProviderActions.loadProvidersFailure, (state) => ({ ...state, providers: [], loadingProviders: false })),

    // Los secretos no pasan por el state: solo se guarda qué ambiente se está enviando y el error
    on(AccountingProviderActions.saveCredentials, (state, { request }) => ({ ...state, saving: request.environment, saveError: null })),
    on(AccountingProviderActions.saveCredentialsSuccess, (state) => ({ ...state, saving: null, saveError: null })),
    on(AccountingProviderActions.saveCredentialsFailure, (state, { environment, message, inline }) => ({
        ...state,
        saving: null,
        saveError: inline ? { environment, message } : null
    })),

    on(AccountingProviderActions.reset, () => initialState)
);
