import { createActionGroup, props } from '@ngrx/store';
import { CreateLicenceLotDto, CreatedLicenceLot, LicenceLotList } from '@/core/models';

export const LicenceLotsActions = createActionGroup({
    source: 'Licence Lots',
    events: {
        'Load List': props<{ companyId: number }>(),
        'Load List Success': props<{ companyId: number; data: LicenceLotList }>(),
        'Load List Failure': props<{ error: string }>(),

        Create: props<{ companyId: number; payload: CreateLicenceLotDto }>(),
        'Create Success': props<{ companyId: number; lot: CreatedLicenceLot }>(),
        'Create Failure': props<{ error: string }>()
    }
});
