import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from '../reducers/company-360.reducer';

// Feature key
export const company360FeatureKey = 'company360';

// Feature state interface
export type Company360State = CompanyState;

// Feature selector
export const selectCompanyState = createFeatureSelector<CompanyState>(company360FeatureKey);

// Selectors
export const selectCompanies = createSelector(
    selectCompanyState,
    (state: CompanyState) => state?.companies ?? []
);
export const selectCompanyIds = createSelector(
    selectCompanies,
    (companies) => companies?.map(c => c.id) ?? []
);
export const selectSelectedCompany = createSelector(
    selectCompanyState,
    (state: CompanyState) => state?.selectedCompany ?? null
);
export const selectCompanyLoading = createSelector(
    selectCompanyState,
    (state: CompanyState) => state?.loading ?? false
);
export const selectCompanyError = createSelector(
    selectCompanyState,
    (state: CompanyState) => state?.error ?? null
);

// Selector para obtener una compañía por ID
export const selectCompanyById = (id: number) => createSelector(
    selectCompanies,
    (companies) => (companies?.find(company => company.id === id) ?? null)
);

// Selector para contar compañías
export const selectCompaniesCount = createSelector(
    selectCompanies,
    (companies) => companies?.length ?? 0
);