import { createActionGroup, props } from '@ngrx/store';
import { MercadoPagoPaymentFilters, MercadoPagoPaymentsPage } from '@/core/models';

export const MercadoPagoPaymentsActions = createActionGroup({
    source: 'MercadoPago Payments',
    events: {
        Search: props<{ filters: MercadoPagoPaymentFilters }>(),
        'Search Success': props<{ result: MercadoPagoPaymentsPage }>(),
        'Search Failure': props<{ error: string }>()
    }
});
