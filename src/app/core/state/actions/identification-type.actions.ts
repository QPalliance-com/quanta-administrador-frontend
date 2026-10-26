import { createActionGroup, props } from '@ngrx/store';
import { IdentificationType } from '@/core/models/identification-type.model';

export const IdentificationTypeActions = createActionGroup({
    source: 'Identification Type',
    events: {
        // Acumula por país sin reemplazar (igual que departamentos)
        'Load Identification Types': props<{ countryCode: string }>(),
        'Load Identification Types Success': props<{ countryCode: string; identificationTypes: IdentificationType[] }>(),
        'Load Identification Types Failure': props<{ error: string }>()
    }
});
