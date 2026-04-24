import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Company } from '@/core/models/company.model';
import { CompaniesActions } from '../actions/companies.actions';

export interface CompaniesState {
    companies: EntityState<Company>;
    selectedCompany: Company | null;
    loading: boolean;
    error: string | null;
}

export const companiesAdapter: EntityAdapter<Company> = createEntityAdapter<Company>();

export const initialState: CompaniesState = {
    companies: companiesAdapter.getInitialState(),
    selectedCompany: null,
    loading: false,
    error: null
};

export const companiesReducer = createReducer(
    initialState,

    on(CompaniesActions.loadCompanies, (state) => ({ ...state, loading: true, error: null })),
    on(CompaniesActions.loadCompaniesSuccess, (state, { companies }) => ({
        ...state,
        companies: companiesAdapter.setAll(companies, state.companies),
        loading: false
    })),
    on(CompaniesActions.loadCompaniesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(CompaniesActions.loadCompany, (state) => ({ ...state, loading: true, error: null })),
    on(CompaniesActions.loadCompanySuccess, (state, { company }) => ({
        ...state,
        selectedCompany: company,
        loading: false
    })),
    on(CompaniesActions.loadCompanyFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(CompaniesActions.createCompany, (state) => ({ ...state, loading: true, error: null })),
    on(CompaniesActions.createCompanySuccess, (state, { company }) => ({
        ...state,
        companies: companiesAdapter.addOne(company, state.companies),
        loading: false
    })),
    on(CompaniesActions.createCompanyFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(CompaniesActions.updateCompany, (state) => ({ ...state, loading: true, error: null })),
    on(CompaniesActions.updateCompanySuccess, (state, { company }) => ({
        ...state,
        companies: companiesAdapter.updateOne({ id: company.id, changes: company }, state.companies),
        selectedCompany: state.selectedCompany?.id === company.id ? company : state.selectedCompany,
        loading: false
    })),
    on(CompaniesActions.updateCompanyFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(CompaniesActions.deleteCompany, (state) => ({ ...state, loading: true, error: null })),
    on(CompaniesActions.deleteCompanySuccess, (state, { id }) => ({
        ...state,
        companies: companiesAdapter.removeOne(id, state.companies),
        selectedCompany: state.selectedCompany?.id === id ? null : state.selectedCompany,
        loading: false
    })),
    on(CompaniesActions.deleteCompanyFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(CompaniesActions.clearSelectedCompany, (state) => ({ ...state, selectedCompany: null })),
    on(CompaniesActions.clearError, (state) => ({ ...state, error: null }))
);
