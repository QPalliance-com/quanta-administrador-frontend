import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountingProviderState } from '../reducers/accounting-provider.reducer';

export const selectAccountingProviderState = createFeatureSelector<AccountingProviderState>('accountingProvider');

export const selectAccountingConfig = createSelector(selectAccountingProviderState, (state) => state.config);

export const selectAccountingProviders = createSelector(selectAccountingProviderState, (state) => state.providers);

export const selectAccountingLoading = createSelector(selectAccountingProviderState, (state) => state.loading);

export const selectAccountingLoadingProviders = createSelector(selectAccountingProviderState, (state) => state.loadingProviders);

export const selectConfigStatus = createSelector(selectAccountingConfig, (config) => config?.status ?? 'unconfigured');

export const selectSelectedProvider = createSelector(selectAccountingConfig, selectAccountingProviders, (config, providers) =>
    config ? (providers.find((p) => p.id === config.provider.id) ?? config.provider) : null
);

export const selectAccountingIsActive = createSelector(selectConfigStatus, (status) => status === 'active');

// El proveedor queda fijo mientras la empresa lo tenga activo
export const selectProviderLocked = selectAccountingIsActive;

export const selectAccountingSaving = createSelector(selectAccountingProviderState, (state) => state.saving);

export const selectAccountingSaveError = createSelector(selectAccountingProviderState, (state) => state.saveError);
