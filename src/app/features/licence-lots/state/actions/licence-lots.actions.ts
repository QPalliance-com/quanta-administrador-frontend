import { createActionGroup, props } from '@ngrx/store';
import { LicenceLotList } from '@/core/models';

export const LicenceLotsActions = createActionGroup({
    source: 'Licence Lots',
    events: {
        'Load List': props<{ companyId: number }>(),
        'Load List Success': props<{ companyId: number; data: LicenceLotList }>(),
        'Load List Failure': props<{ error: string }>()
    }
});
