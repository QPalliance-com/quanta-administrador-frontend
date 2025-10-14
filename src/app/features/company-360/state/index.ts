/**
 * Feature State Index
 * Este archivo exporta todo lo relacionado con el state del módulo Company-360
 */ 

import { ActionReducerMap } from '@ngrx/store';
import { company360FeatureKey } from './selectors/company-360.selectors';
import * as CompanyActions from './actions/company-360.actions';
import * as CompanySelectors from './selectors/company-360.selectors';
import { CompanyState, companyReducer } from './reducers/company-360.reducer';
import { CompanyEffects } from './effects/company-360.effects';

// El estado de la feature es plano (CompanyState)
// Exportar como un diccionario genérico para compatibilidad con el spread en app.config.ts
export const reducers = {
    [company360FeatureKey]: companyReducer
};

// Feature effects
export const Company360Effects = [CompanyEffects];

// Barrel exports
export { company360FeatureKey };
export { CompanyActions };
export { CompanySelectors };
export { CompanyEffects };
export { companyReducer };
export type { CompanyState };