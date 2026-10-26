import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MercadoPagoPayment } from '@/core/models';
import { InvoicesActions } from '@/features/licence-lots/state/actions/invoices.actions';
import { selectDownloadingInvoiceId } from '@/features/licence-lots/state/selectors/invoices.selectors';
import { formatMoney } from '@/features/licence-lots/utils/licence-lot.utils';
import { RECONCILIATION_META, mpStatus } from '../../utils/mercadopago.utils';

@Component({
    standalone: true,
    selector: 'app-payment-detail-drawer',
    templateUrl: './payment-detail-drawer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterLink, DrawerModule, ButtonModule, TagModule]
})
export class PaymentDetailDrawerComponent {
    private store = inject(Store);

    @Input() visible = false;
    @Input() payment: MercadoPagoPayment | null = null;
    @Output() closed = new EventEmitter<void>();

    readonly formatMoney = formatMoney;
    readonly reconciliationMeta = RECONCILIATION_META;
    readonly mpStatus = mpStatus;
    downloadingId$ = this.store.select(selectDownloadingInvoiceId);

    onVisibleChange(value: boolean): void {
        if (!value) this.closed.emit();
    }

    downloadInvoice(invoiceId: number): void {
        this.store.dispatch(InvoicesActions.downloadInvoice({ invoiceId }));
    }
}
