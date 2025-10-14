import { createReducer, on } from '@ngrx/store';
import { Company } from '@/core/models';
import * as companyActions from '../actions/company-360.actions';

export interface CompanyState {
    companies: Company[];
    selectedCompany: Company | null;
    loading: boolean;
    error: any;
}

export const initialState: CompanyState = {
    companies: [],
    selectedCompany: null,
    loading: false,
    error: null
};

export const companyReducer = createReducer(
    initialState,
    
    // Load Companies
    on(companyActions.loadCompanies, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.loadCompaniesSuccess, (state, { companies }) => ({
        ...state,
        companies,
        loading: false
    })),
    on(companyActions.loadCompaniesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load Single Company
    on(companyActions.loadCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.loadCompanySuccess, (state, { company }) => ({
        ...state,
        selectedCompany: company,
        loading: false
    })),
    on(companyActions.loadCompanyFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load Company By ID
    on(companyActions.loadCompanyById, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.loadCompanyByIdSuccess, (state, { company }) => ({
        ...state,
        selectedCompany: company,
        loading: false
    })),
    on(companyActions.loadCompanyByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create Company
    on(companyActions.createCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.createCompanySuccess, (state, { company }) => ({
        ...state,
        companies: [...state.companies, company],
        selectedCompany: company,
        loading: false
    })),
    on(companyActions.createCompanyFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update Company
    on(companyActions.updateCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.updateCompanySuccess, (state, { company }) => ({
        ...state,
        companies: state.companies.map(c => c.id === company.id ? company : c),
        selectedCompany: company,
        loading: false
    })),
    on(companyActions.updateCompanyFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Patch Company
    on(companyActions.patchCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.patchCompanySuccess, (state, { company }) => ({
        ...state,
        companies: state.companies.map(c => c.id === company.id ? company : c),
        selectedCompany: company,
        loading: false
    })),
    on(companyActions.patchCompanyFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete Company
    on(companyActions.deleteCompany, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(companyActions.deleteCompanySuccess, (state, { id }) => ({
        ...state,
        companies: state.companies.filter(c => c.id !== id),
        selectedCompany: state.selectedCompany?.id === id ? null : state.selectedCompany,
        loading: false
    })),
    on(companyActions.deleteCompanyFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);