import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CountryCatalog } from '@/core/models';

export const CountriesActions = createActionGroup({
    source: 'Countries',
    events: {
        'Load Countries': emptyProps(),
        'Load Countries Success': props<{ countries: CountryCatalog[] }>(),
        'Load Countries Failure': props<{ error: string }>()
    }
});
