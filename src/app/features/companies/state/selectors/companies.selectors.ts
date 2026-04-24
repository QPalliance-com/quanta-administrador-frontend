import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompaniesState, companiesAdapter } from '../reducers/companies.reducer';

export const selectCompaniesState = createFeatureSelector<CompaniesState>('companies');

export const { selectAll: selectAllCompanies, selectEntities: selectCompanyEntities } =
    companiesAdapter.getSelectors(createSelector(selectCompaniesState, (state) => state.companies));

export const selectCompaniesLoading = createSelector(selectCompaniesState, (state) => state.loading);

export const selectCompaniesError = createSelector(selectCompaniesState, (state) => state.error);

export const selectSelectedCompany = createSelector(
    selectCompaniesState,
    (state) => state.selectedCompany
);

export const selectCompanyById = (id: number) =>
    createSelector(selectAllCompanies, (companies) => companies.find((c) => c.id === id) ?? null);
