import { Routes } from '@angular/router';
import { MercadoPagoPaymentsComponent } from './pages/mercadopago-payments/mercadopago-payments';

export const billingRoutes: Routes = [
    {
        path: 'mercadopago-payments',
        component: MercadoPagoPaymentsComponent,
        data: { breadcrumb: 'Pagos MercadoPago' }
    }
];
