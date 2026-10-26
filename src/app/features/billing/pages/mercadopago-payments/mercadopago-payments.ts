import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MercadoPagoPayment, MercadoPagoPaymentFilters } from '@/core/models';
import { InvoicesActions } from '@/features/licence-lots/state/actions/invoices.actions';
import { selectDownloadingInvoiceId } from '@/features/licence-lots/state/selectors/invoices.selectors';
import { formatMoney, toIsoDate } from '@/features/licence-lots/utils/licence-lot.utils';
import { MercadoPagoPaymentsActions } from '../../state/actions/mercadopago-payments.actions';
import {
    selectMpError,
    selectMpFilters,
    selectMpLoading,
    selectMpPage,
    selectMpPageSize,
    selectMpPayments,
    selectMpTotal
} from '../../state/selectors/mercadopago-payments.selectors';
import { PaymentDetailDrawerComponent } from '../../components/payment-detail-drawer/payment-detail-drawer';
import {
    MAX_MP_RESULTS,
    PAGE_SIZE_OPTIONS,
    RECONCILIATION_META,
    STATUS_FILTER_OPTIONS,
    TagSeverity,
    defaultDateRange,
    lastAllowedPage,
    mpStatus,
    reachableRecords
} from '../../utils/mercadopago.utils';

type ViewFilter = 'all' | 'differences';

@Component({
    standalone: true,
    selector: 'app-mercadopago-payments',
    templateUrl: './mercadopago-payments.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DatePickerModule,
        SelectModule,
        SelectButtonModule,
        InputTextModule,
        MessageModule,
        TagModule,
        TooltipModule,
        ToastModule,
        PaymentDetailDrawerComponent
    ],
    providers: [MessageService]
})
export class MercadoPagoPaymentsComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();
    private viewFilter$ = new BehaviorSubject<ViewFilter>('all');
    private copiedTimer: ReturnType<typeof setTimeout> | null = null;
    private lastFilters: MercadoPagoPaymentFilters | null = null;

    readonly today = new Date();
    readonly maxResults = MAX_MP_RESULTS;
    readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
    readonly statusOptions = STATUS_FILTER_OPTIONS;
    // Ensanchado a string: en la tabla `let-p` es `any` y strict templates no deja indexar un Record<union>
    readonly reconciliationMeta: Record<string, { label: string; severity: TagSeverity }> = RECONCILIATION_META;
    readonly mpStatus = mpStatus;
    readonly formatMoney = formatMoney;
    readonly viewOptions: { label: string; value: ViewFilter }[] = [
        { label: 'Todos', value: 'all' },
        { label: 'Solo con diferencias', value: 'differences' }
    ];
    viewFilter: ViewFilter = 'all';

    form: FormGroup = this.fb.group({
        range: [defaultDateRange()],
        status: [null as string | null],
        paymentMethodId: [''],
        externalReference: ['']
    });

    payments$ = this.store.select(selectMpPayments);
    total$ = this.store.select(selectMpTotal);
    page$ = this.store.select(selectMpPage);
    pageSize$ = this.store.select(selectMpPageSize);
    loading$ = this.store.select(selectMpLoading);
    error$ = this.store.select(selectMpError);
    downloadingId$ = this.store.select(selectDownloadingInvoiceId);

    // El filtro "Solo con diferencias" es del cliente: el backend no filtra por conciliación, así que aplica a la página cargada
    visiblePayments$ = combineLatest([this.payments$, this.viewFilter$]).pipe(
        map(([payments, view]) => (view === 'differences' ? payments.filter((p) => this.needsAttention(p)) : payments))
    );
    differencesCount$ = this.payments$.pipe(map((payments) => payments.filter((p) => this.needsAttention(p)).length));
    reachableTotal$ = combineLatest([this.total$, this.pageSize$]).pipe(map(([total, size]) => reachableRecords(total, size)));
    truncated$ = combineLatest([this.total$, this.pageSize$]).pipe(map(([total, size]) => total > reachableRecords(total, size)));
    first$ = combineLatest([this.page$, this.pageSize$]).pipe(map(([page, size]) => (page - 1) * size));

    selectedPayment: MercadoPagoPayment | null = null;
    displayDetail = false;
    copiedId: string | null = null;

    ngOnInit(): void {
        this.store
            .select(selectMpFilters)
            .pipe(takeUntil(this.destroy$))
            .subscribe((filters) => (this.lastFilters = filters));

        this.search();
    }

    /** Busca desde la primera página con los filtros del formulario, conservando el tamaño de página elegido. */
    search(): void {
        this.dispatchSearch(1, this.lastFilters?.pageSize ?? 20);
    }

    clear(): void {
        this.form.reset({ range: defaultDateRange(), status: null, paymentMethodId: '', externalReference: '' });
        this.search();
    }

    retry(): void {
        if (this.lastFilters) {
            this.store.dispatch(MercadoPagoPaymentsActions.search({ filters: this.lastFilters }));
        } else {
            this.search();
        }
    }

    onPage(event: { first?: number | null; rows?: number | null }): void {
        const pageSize = event.rows ?? this.lastFilters?.pageSize ?? 20;
        const requested = Math.floor((event.first ?? 0) / pageSize) + 1;
        // MercadoPago no pagina más allá del resultado 10 000: nunca se pide una página fuera del límite
        const page = Math.min(requested, lastAllowedPage(pageSize));
        this.dispatchSearch(page, pageSize);
    }

    onViewChange(value: ViewFilter): void {
        this.viewFilter$.next(value);
    }

    openDetail(payment: MercadoPagoPayment): void {
        this.selectedPayment = payment;
        this.displayDetail = true;
    }

    downloadInvoice(event: Event, invoiceId: number): void {
        event.stopPropagation();
        this.store.dispatch(InvoicesActions.downloadInvoice({ invoiceId }));
    }

    async copyPaymentId(event: Event, paymentId: string): Promise<void> {
        event.stopPropagation();
        try {
            await navigator.clipboard.writeText(paymentId);
            this.copiedId = paymentId;
        } catch {
            this.copiedId = null;
        }
        if (this.copiedTimer) clearTimeout(this.copiedTimer);
        this.copiedTimer = setTimeout(() => {
            this.copiedId = null;
            this.cdr.markForCheck();
        }, 2000);
        this.cdr.markForCheck();
    }

    needsAttention(payment: MercadoPagoPayment): boolean {
        return RECONCILIATION_META[payment.reconciliation].needsAttention;
    }

    /** Resalta las filas con diferencia: rojo para lo grave, naranja para lo pendiente de actualizar. */
    rowClass(payment: MercadoPagoPayment): string {
        const meta = RECONCILIATION_META[payment.reconciliation];
        if (!meta.needsAttention) return '';
        return meta.severity === 'danger' ? 'bg-red-50 dark:bg-red-950/30' : 'bg-orange-50 dark:bg-orange-950/30';
    }

    private dispatchSearch(page: number, pageSize: number): void {
        const { range, status, paymentMethodId, externalReference } = this.form.value;
        const [begin, end] = (range ?? []) as (Date | null)[];

        this.store.dispatch(
            MercadoPagoPaymentsActions.search({
                filters: {
                    beginDate: begin ? toIsoDate(begin) : undefined,
                    // Mientras el usuario no elige el segundo extremo del rango se busca ese único día
                    endDate: begin ? toIsoDate(end ?? begin) : undefined,
                    status: status ?? undefined,
                    paymentMethodId: paymentMethodId?.trim() || undefined,
                    externalReference: externalReference?.trim() || undefined,
                    page,
                    pageSize
                }
            })
        );
    }

    ngOnDestroy(): void {
        if (this.copiedTimer) clearTimeout(this.copiedTimer);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
