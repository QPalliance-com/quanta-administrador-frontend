import { createActionGroup, props } from '@ngrx/store';
import { Timezone } from '@/core/models/timezone.model';

export const TimezoneActions = createActionGroup({
    source: 'Timezone',
    events: {
        // Acumula por país sin reemplazar (igual que tipos de identificación)
        'Load Timezones': props<{ countryCode: string }>(),
        'Load Timezones Success': props<{ countryCode: string; timezones: Timezone[] }>(),
        'Load Timezones Failure': props<{ error: string }>()
    }
});
