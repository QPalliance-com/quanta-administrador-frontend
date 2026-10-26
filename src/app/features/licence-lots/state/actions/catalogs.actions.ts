import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaymentTypeCatalog, PeriodCatalog } from '@/core/models';

export const CatalogsActions = createActionGroup({
    source: 'Catalogs',
    events: {
        Load: emptyProps(),
        'Load Success': props<{ paymentTypes: PaymentTypeCatalog[]; periods: PeriodCatalog[] }>(),
        'Load Failure': props<{ error: string }>()
    }
});
