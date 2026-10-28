import { createActionGroup, props } from '@ngrx/store';
import { HealthEntityType } from '@/core/models/health-entity-type.model';

export const HealthEntityTypeActions = createActionGroup({
    source: 'Health Entity Type',
    events: {
        // Acumula por país sin reemplazar (igual que departamentos)
        'Load Health Entity Types': props<{ countryCode: string }>(),
        'Load Health Entity Types Success': props<{ countryCode: string; healthEntityTypes: HealthEntityType[] }>(),
        'Load Health Entity Types Failure': props<{ error: string }>()
    }
});
