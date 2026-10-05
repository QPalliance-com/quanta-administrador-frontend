import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ExpiringLot } from '@/core/models';

export const ExpiringLotsActions = createActionGroup({
    source: 'Expiring Lots',
    events: {
        'Load Expiring Lots': emptyProps(),
        'Load Expiring Lots Success': props<{ lots: ExpiringLot[] }>(),
        'Load Expiring Lots Failure': props<{ error: string }>()
    }
});
