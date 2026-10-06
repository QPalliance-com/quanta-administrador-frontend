import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LicenceLotService } from '@/core/services/licence-lot.service';
import { LicenceLotsActions } from '../actions/licence-lots.actions';
import { selectLicenceLotsCompanyId } from '../selectors/licence-lots.selectors';
import { formatIsoDate, formatMoney } from '../../utils/licence-lot.utils';

@Injectable()
export class LicenceLotsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private licenceLotService = inject(LicenceLotService);
    private messageService = inject(MessageService);

    loadList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.loadList),
            switchMap(({ companyId }) =>
                this.licenceLotService.getByCompany(companyId).pipe(
                    map((response) => LicenceLotsActions.loadListSuccess({ companyId, data: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenceLotsActions.loadListFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.create),
            exhaustMap(({ companyId, payload }) =>
                this.licenceLotService.create(companyId, payload).pipe(
                    map((response) => LicenceLotsActions.createSuccess({ companyId, lot: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenceLotsActions.createFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    createSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.createSuccess),
            tap(() =>
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Lote de licencias activado correctamente' })
            ),
            map(({ companyId }) => LicenceLotsActions.loadList({ companyId }))
        )
    );

    addLicences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.addLicences),
            exhaustMap(({ companyId, payload }) =>
                this.licenceLotService.addLicences(companyId, payload).pipe(
                    map((response) => LicenceLotsActions.addLicencesSuccess({ companyId, result: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenceLotsActions.addLicencesFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    addLicencesSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.addLicencesSuccess),
            tap(({ result }) =>
                this.messageService.add({
                    severity: 'success',
                    summary: result.action === 'merged' ? 'Licencias agregadas' : 'Nuevo lote creado',
                    detail:
                        result.action === 'merged'
                            ? `Se agregaron ${(result.newUserCount ?? 0) - (result.previousUserCount ?? 0)} licencias al lote #${result.lotId}` +
                              (result.proratedAmount ? `. Monto prorrateado: ${formatMoney(result.proratedAmount, result.currency)}` : '')
                            : `Se creó el lote #${result.lotId} con ${result.userCount} licencias porque el periodo difiere del lote vigente`
                })
            ),
            map(({ companyId }) => LicenceLotsActions.loadList({ companyId }))
        )
    );

    extend$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.extend),
            exhaustMap(({ companyId, lotId, payload }) =>
                this.licenceLotService.extend(companyId, lotId, payload).pipe(
                    map((response) => LicenceLotsActions.extendSuccess({ companyId, result: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenceLotsActions.extendFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    extendSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.extendSuccess),
            tap(({ result }) =>
                this.messageService.add({
                    severity: 'success',
                    summary: result.renewalType === 'early' ? 'Lote extendido' : 'Lote reactivado',
                    detail: `Lote #${result.lotId}: nuevo vencimiento ${formatIsoDate(result.newEndDate)}`
                })
            ),
            // El panel de alertas (F06) también extiende lotes: solo se recarga el listado si es la empresa abierta
            withLatestFrom(this.store.select(selectLicenceLotsCompanyId)),
            filter(([{ companyId }, openCompanyId]) => companyId === openCompanyId),
            map(([{ companyId }]) => LicenceLotsActions.loadList({ companyId }))
        )
    );

    scheduleMigration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.scheduleMigration),
            exhaustMap(({ companyId, lotId, payload }) =>
                this.licenceLotService.scheduleMigration(companyId, lotId, payload).pipe(
                    map((response) => LicenceLotsActions.scheduleMigrationSuccess({ companyId, result: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenceLotsActions.scheduleMigrationFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    scheduleMigrationSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.scheduleMigrationSuccess),
            tap(({ result }) =>
                this.messageService.add({
                    severity: 'success',
                    summary: 'Migración programada',
                    detail: `El lote #${result.lotId} pasará a ${result.scheduledMigrationTo.displayName} el ${formatIsoDate(result.effectiveAt)}`
                })
            ),
            map(({ companyId }) => LicenceLotsActions.loadList({ companyId }))
        )
    );

    // Generar el link no crea ningún lote, así que no hay listado que recargar
    generatePseLink$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.generatePseLink),
            exhaustMap(({ companyId, payload }) =>
                this.licenceLotService.generatePseCheckout(companyId, payload).pipe(
                    map((response) => LicenceLotsActions.generatePseLinkSuccess({ result: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenceLotsActions.generatePseLinkFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    // Los errores de creación, agregado, extensión, migración y link PSE se muestran dentro del drawer/dialog, no como toast
    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LicenceLotsActions.loadListFailure),
                tap(({ error }) => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }))
            ),
        { dispatch: false }
    );

    private extractError(error: HttpErrorResponse): string {
        return error.error?.message ?? error.message ?? 'Ha ocurrido un error inesperado';
    }
}
