import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaymentTypeCatalog, PeriodCatalog } from '@/core/models';

export const CatalogsActions = createActionGroup({
    source: 'Catalogs',
    events: {
        'Load Payment Types': props<{ countryCode: string }>(),
        'Load Payment Types Success': props<{ countryCode: string; paymentTypes: PaymentTypeCatalog[] }>(),
        'Load Periods': emptyProps(),
        'Load Periods Success': props<{ periods: PeriodCatalog[] }>(),
        'Load Failure': props<{ error: string }>()
    }
});
