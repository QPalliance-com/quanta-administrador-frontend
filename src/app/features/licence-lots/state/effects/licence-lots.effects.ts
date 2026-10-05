import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LicenceLotService } from '@/core/services/licence-lot.service';
import { LicenceLotsActions } from '../actions/licence-lots.actions';

@Injectable()
export class LicenceLotsEffects {
    private actions$ = inject(Actions);
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

    // Los errores de creación se muestran dentro del drawer, no como toast
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
