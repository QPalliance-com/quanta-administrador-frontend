import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Licence } from '@/core/models/licence.model';

export const LicencesActions = createActionGroup({
    source: 'Licences',
    events: {
        'Load Licences': emptyProps(),
        'Load Licences Success': props<{ licences: Licence[] }>(),
        'Load Licences Failure': props<{ error: string }>(),

        'Load Licence': props<{ id: number }>(),
        'Load Licence Success': props<{ licence: Licence }>(),
        'Load Licence Failure': props<{ error: string }>(),

        'Create Licence': props<{ licence: Licence }>(),
        'Create Licence Success': props<{ licence: Licence }>(),
        'Create Licence Failure': props<{ error: string }>(),

        'Update Licence': props<{ id: number; licence: Licence }>(),
        'Update Licence Success': props<{ licence: Licence }>(),
        'Update Licence Failure': props<{ error: string }>(),

        'Delete Licence': props<{ id: number }>(),
        'Delete Licence Success': props<{ id: number }>(),
        'Delete Licence Failure': props<{ error: string }>(),

        'Clear Selected Licence': emptyProps(),
        'Clear Error': emptyProps()
    }
});
