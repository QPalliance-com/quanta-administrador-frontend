import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
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
    private router = inject(Router);

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

    loadLicence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicencesActions.loadLicence),
            mergeMap(({ id }) =>
                this.licenceService.getLicence(id).pipe(
                    map((response) => LicencesActions.loadLicenceSuccess({ licence: response.data })),
                    catchError((error) =>
                        of(LicencesActions.loadLicenceFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    createLicence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicencesActions.createLicence),
            mergeMap(({ licence }) =>
                this.licenceService.createLicence(licence).pipe(
                    map((response) => LicencesActions.createLicenceSuccess({ licence: response.data })),
                    catchError((error) =>
                        of(LicencesActions.createLicenceFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    createLicenceSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LicencesActions.createLicenceSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Licencia creada correctamente'
                    });
                    this.router.navigate(['/settings/licences/list']);
                })
            ),
        { dispatch: false }
    );

    updateLicence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicencesActions.updateLicence),
            mergeMap(({ id, licence }) =>
                this.licenceService.updateLicence(id, licence).pipe(
                    map((response) => LicencesActions.updateLicenceSuccess({ licence: response.data })),
                    catchError((error) =>
                        of(LicencesActions.updateLicenceFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateLicenceSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LicencesActions.updateLicenceSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Licencia actualizada correctamente'
                    });
                    this.router.navigate(['/settings/licences/list']);
                })
            ),
        { dispatch: false }
    );

    deleteLicence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicencesActions.deleteLicence),
            mergeMap(({ id }) =>
                this.licenceService.deleteLicence(id).pipe(
                    map(() => LicencesActions.deleteLicenceSuccess({ id })),
                    catchError((error) =>
                        of(LicencesActions.deleteLicenceFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    deleteLicenceSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(LicencesActions.deleteLicenceSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Licencia eliminada correctamente'
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
                    LicencesActions.loadLicenceFailure,
                    LicencesActions.createLicenceFailure,
                    LicencesActions.updateLicenceFailure,
                    LicencesActions.deleteLicenceFailure
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
