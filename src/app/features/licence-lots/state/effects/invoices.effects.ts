import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { BillingInvoiceService } from '@/core/services/billing-invoice.service';
import { saveBlob } from '@/core/utils/download-blob';
import { InvoicesActions } from '../actions/invoices.actions';
import { LicenceLotsActions } from '../actions/licence-lots.actions';
import { selectInvoicesCompanyId } from '../selectors/invoices.selectors';

@Injectable()
export class InvoicesEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private invoiceService = inject(BillingInvoiceService);
    private messageService = inject(MessageService);

    loadInvoices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoicesActions.loadInvoices),
            switchMap(({ companyId }) =>
                this.invoiceService.getByCompany(companyId).pipe(
                    map((response) => InvoicesActions.loadInvoicesSuccess({ companyId, invoices: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(InvoicesActions.loadInvoicesFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    // Activar, agregar y extender con monto generan una factura nueva: se refresca si es la empresa abierta
    reloadAfterPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.createSuccess, LicenceLotsActions.addLicencesSuccess, LicenceLotsActions.extendSuccess),
            withLatestFrom(this.store.select(selectInvoicesCompanyId)),
            filter(([{ companyId }, openCompanyId]) => companyId === openCompanyId),
            map(([{ companyId }]) => InvoicesActions.loadInvoices({ companyId }))
        )
    );

    download$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoicesActions.downloadInvoice),
            exhaustMap(({ invoiceId }) =>
                this.invoiceService.downloadPdf(invoiceId).pipe(
                    tap((blob) => saveBlob(blob, `factura-${invoiceId}.pdf`)),
                    map(() => InvoicesActions.downloadInvoiceSuccess({ invoiceId })),
                    catchError((error: HttpErrorResponse) => of(InvoicesActions.downloadInvoiceFailure({ error: this.downloadError(error) })))
                )
            )
        )
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(InvoicesActions.downloadInvoiceFailure),
                tap(({ error }) => this.messageService.add({ severity: 'error', summary: 'No se pudo descargar', detail: error }))
            ),
        { dispatch: false }
    );

    private extractError(error: HttpErrorResponse): string {
        return error.error?.message ?? error.message ?? 'No se pudieron cargar las facturas';
    }

    // Con responseType blob el cuerpo del error llega como Blob, no como JSON: el mensaje se deduce del estado HTTP
    private downloadError(error: HttpErrorResponse): string {
        if (error.status === 404) return 'La factura todavía no tiene un PDF disponible.';
        if (error.status === 403) return 'Esta acción es exclusiva de los administradores de Quanta.';
        return 'Ocurrió un error al generar el PDF. Inténtalo de nuevo.';
    }
}
