import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LicenceService } from '@/core/services/licence.service';
import { LicencesActions } from '../actions/licences.actions';

@Injectable()
export class LicencesEffects {
    private actions$ = inject(Actions);
    private licenceService = inject(LicenceService);
    private messageService = inject(MessageService);

    loadLicences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicencesActions.loadLicences),
            mergeMap(() =>
                this.licenceService.getLicences().pipe(
                    map((response) => LicencesActions.loadLicencesSuccess({ licences: response.data })),
                    catchError((error) =>
                        of(LicencesActions.loadLicencesFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateLicencePrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicencesActions.updateLicencePrice),
            mergeMap(({ id, amount }) =>
                this.licenceService.updateLicencePrice(id, amount).pipe(
                    map(() => LicencesActions.updateLicencePriceSuccess({ id, amount })),
                    catchError((error) =>
                        of(LicencesActions.updateLicencePriceFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateLicencePriceSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LicencesActions.updateLicencePriceSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Precio actualizado correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    LicencesActions.loadLicencesFailure,
                    LicencesActions.updateLicencePriceFailure
                ),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error
                    });
                })
            ),
        { dispatch: false }
    );
}
