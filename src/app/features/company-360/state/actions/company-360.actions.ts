import { createAction, props } from '@ngrx/store';
import { Company } from '@/core/models';

// Load all companies (list)
export const loadCompanies = createAction('[Company] Load Companies');
export const loadCompaniesSuccess = createAction('[Company] Load Companies Success', props<{ companies: Company[] }>());
export const loadCompaniesFailure = createAction('[Company] Load Companies Failure', props<{ error: any }>());

// Load single company
export const loadCompany = createAction('[Company] Load Company');
export const loadCompanySuccess = createAction('[Company] Load Company Success', props<{ company: Company }>());
export const loadCompanyFailure = createAction('[Company] Load Company Failure', props<{ error: any }>());

// Load company by ID
export const loadCompanyById = createAction('[Company] Load Company By ID', props<{ id: number }>());
export const loadCompanyByIdSuccess = createAction('[Company] Load Company By ID Success', props<{ company: Company }>());
export const loadCompanyByIdFailure = createAction('[Company] Load Company By ID Failure', props<{ error: any }>());

// Create company
export const createCompany = createAction('[Company] Create Company', props<{ company: Omit<Company, 'id'> }>());
export const createCompanySuccess = createAction('[Company] Create Company Success', props<{ company: Company }>());
export const createCompanyFailure = createAction('[Company] Create Company Failure', props<{ error: any }>());

// Update company
export const updateCompany = createAction('[Company] Update Company', props<{ company: Company }>());
export const updateCompanySuccess = createAction('[Company] Update Company Success', props<{ company: Company }>());
export const updateCompanyFailure = createAction('[Company] Update Company Failure', props<{ error: any }>());

// Patch company
export const patchCompany = createAction('[Company] Patch Company', props<{ id: number; changes: Partial<Company> }>());
export const patchCompanySuccess = createAction('[Company] Patch Company Success', props<{ company: Company }>());
export const patchCompanyFailure = createAction('[Company] Patch Company Failure', props<{ error: any }>());

// Delete company
export const deleteCompany = createAction('[Company] Delete Company', props<{ id: number }>());
export const deleteCompanySuccess = createAction('[Company] Delete Company Success', props<{ id: number }>());
export const deleteCompanyFailure = createAction('[Company] Delete Company Failure', props<{ error: any }>());