import { Component, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DateColombiaPipe } from '@/core/pipes/date-colombia.pipe';
import { InvoicesActions } from '../../state/actions/invoices.actions';
import {
    selectDownloadingInvoiceId,
    selectInvoices,
    selectInvoicesError,
    selectInvoicesLoading
} from '../../state/selectors/invoices.selectors';
import { formatMoney } from '../../utils/licence-lot.utils';

const PROVIDER_LABELS: Record<string, string> = {
    manual_transfer: 'Transferencia bancaria',
    pse: 'PSE',
    recurring_card: 'Tarjeta de crédito',
    mercadopago: 'MercadoPago'
};

@Component({
    standalone: true,
    selector: 'app-licence-invoices',
    templateUrl: './licence-invoices.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TableModule, ButtonModule, MessageModule, TagModule, TooltipModule, DateColombiaPipe]
})
export class LicenceInvoicesComponent implements OnInit {
    private store = inject(Store);

    @Input({ required: true }) companyId!: number;

    readonly formatMoney = formatMoney;
    readonly providerLabels = PROVIDER_LABELS;

    invoices$ = this.store.select(selectInvoices);
    loading$ = this.store.select(selectInvoicesLoading);
    error$ = this.store.select(selectInvoicesError);
    downloadingId$ = this.store.select(selectDownloadingInvoiceId);

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.store.dispatch(InvoicesActions.loadInvoices({ companyId: this.companyId }));
    }

    download(invoiceId: number): void {
        this.store.dispatch(InvoicesActions.downloadInvoice({ invoiceId }));
    }

    /** CHARGED_OK es el único estado que genera hoy el flujo de lotes; cualquier otro se muestra tal cual. */
    statusLabel(status: string): string {
        return status === 'CHARGED_OK' ? 'Cobrada' : status;
    }

    statusSeverity(status: string): 'success' | 'secondary' {
        return status === 'CHARGED_OK' ? 'success' : 'secondary';
    }
}
