import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    HealthEntity,
    HealthEntityQuery,
    CreateHealthEntityDto,
    UpdateHealthEntityDto
} from '@/core/models/health-entity.model';

export const HealthEntitiesActions = createActionGroup({
    source: 'Health Entities',
    events: {
        'Load List': props<{ query: HealthEntityQuery }>(),
        'Load List Success': props<{ items: HealthEntity[] }>(),
        'Load List Failure': props<{ error: string }>(),

        Create: props<{ payload: CreateHealthEntityDto }>(),
        'Create Success': props<{ id: number }>(),
        'Create Failure': props<{ error: string }>(),

        Update: props<{ id: number; countryCode: string; payload: UpdateHealthEntityDto }>(),
        'Update Success': props<{ id: number }>(),
        'Update Failure': props<{ error: string }>(),

        Delete: props<{ id: number; countryCode: string }>(),
        'Delete Success': props<{ id: number }>(),
        'Delete Failure': props<{ error: string }>(),

        'Reset State': emptyProps()
    }
});
