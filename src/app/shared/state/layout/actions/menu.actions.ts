import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

export const MenuActions = createActionGroup({
    source: 'Menu',
    events: {
        'Load Menu': emptyProps(),
        'Load Menu Success': props<{ menu: MenuItem[] }>(),
        'Load Menu Failure': props<{ error: any }>()
    }
});
