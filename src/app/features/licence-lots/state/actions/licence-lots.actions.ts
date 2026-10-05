import { createActionGroup, props } from '@ngrx/store';
import {
    AddLicencesDto,
    AddLicencesResult,
    CreateLicenceLotDto,
    CreatedLicenceLot,
    ExtendLicenceLotDto,
    ExtendLicenceLotResult,
    LicenceLotList,
    ScheduleMigrationDto,
    ScheduleMigrationResult
} from '@/core/models';

export const LicenceLotsActions = createActionGroup({
    source: 'Licence Lots',
    events: {
        'Load List': props<{ companyId: number }>(),
        'Load List Success': props<{ companyId: number; data: LicenceLotList }>(),
        'Load List Failure': props<{ error: string }>(),

        Create: props<{ companyId: number; payload: CreateLicenceLotDto }>(),
        'Create Success': props<{ companyId: number; lot: CreatedLicenceLot }>(),
        'Create Failure': props<{ error: string }>(),

        'Add Licences': props<{ companyId: number; payload: AddLicencesDto }>(),
        'Add Licences Success': props<{ companyId: number; result: AddLicencesResult }>(),
        'Add Licences Failure': props<{ error: string }>(),

        Extend: props<{ companyId: number; lotId: number; payload: ExtendLicenceLotDto }>(),
        'Extend Success': props<{ companyId: number; result: ExtendLicenceLotResult }>(),
        'Extend Failure': props<{ error: string }>(),

        'Schedule Migration': props<{ companyId: number; lotId: number; payload: ScheduleMigrationDto }>(),
        'Schedule Migration Success': props<{ companyId: number; result: ScheduleMigrationResult }>(),
        'Schedule Migration Failure': props<{ error: string }>()
    }
});
