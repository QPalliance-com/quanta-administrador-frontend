import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Company, CompanyRequest } from '@/core/models/company.model';

export const CompaniesActions = createActionGroup({
    source: 'Companies',
    events: {
        'Load Companies': emptyProps(),
        'Load Companies Success': props<{ companies: Company[] }>(),
        'Load Companies Failure': props<{ error: string }>(),

        'Load Company': props<{ id: number }>(),
        'Load Company Success': props<{ company: Company }>(),
        'Load Company Failure': props<{ error: string }>(),

        'Create Company': props<{ company: CompanyRequest }>(),
        'Create Company Success': props<{ company: Company }>(),
        'Create Company Failure': props<{ error: string }>(),

        'Update Company': props<{ company: CompanyRequest }>(),
        'Update Company Success': props<{ company: Company }>(),
        'Update Company Failure': props<{ error: string }>(),

        'Delete Company': props<{ id: number }>(),
        'Delete Company Success': props<{ id: number }>(),
        'Delete Company Failure': props<{ error: string }>(),

        'Clear Selected Company': emptyProps(),
        'Clear Error': emptyProps()
    }
});
