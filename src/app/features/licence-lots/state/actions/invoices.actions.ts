import { createActionGroup, props } from '@ngrx/store';
import { BillingInvoice } from '@/core/models';

export const InvoicesActions = createActionGroup({
    source: 'Licence Invoices',
    events: {
        'Load Invoices': props<{ companyId: number }>(),
        'Load Invoices Success': props<{ companyId: number; invoices: BillingInvoice[] }>(),
        'Load Invoices Failure': props<{ error: string }>(),

        'Download Invoice': props<{ invoiceId: number }>(),
        'Download Invoice Success': props<{ invoiceId: number }>(),
        'Download Invoice Failure': props<{ error: string }>()
    }
});
