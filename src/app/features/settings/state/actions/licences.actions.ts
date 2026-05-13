import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Licence } from '@/core/models/licence.model';

export const LicencesActions = createActionGroup({
    source: 'Licences',
    events: {
        'Load Licences': emptyProps(),
        'Load Licences Success': props<{ licences: Licence[] }>(),
        'Load Licences Failure': props<{ error: string }>(),

        'Update Licence Price': props<{ id: number; amount: number }>(),
        'Update Licence Price Success': props<{ id: number; amount: number }>(),
        'Update Licence Price Failure': props<{ error: string }>(),

        'Clear Error': emptyProps()
    }
});
