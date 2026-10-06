import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LicenseConfigService } from '@/core/services/license-config.service';
import { LicenseConfigActions } from '../actions/license-config.actions';

@Injectable()
export class LicenseConfigEffects {
    private actions$ = inject(Actions);
    private licenseConfigService = inject(LicenseConfigService);
    private messageService = inject(MessageService);

    loadGlobal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseConfigActions.loadGlobal),
            switchMap(() =>
                this.licenseConfigService.getGlobal().pipe(
                    map((response) => LicenseConfigActions.loadGlobalSuccess({ config: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenseConfigActions.loadGlobalFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    loadOverrides$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseConfigActions.loadOverrides),
            switchMap(() =>
                this.licenseConfigService.getOverrides().pipe(
                    map((response) => LicenseConfigActions.loadOverridesSuccess({ overrides: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenseConfigActions.loadOverridesFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseConfigActions.update),
            exhaustMap(({ payload }) =>
                this.licenseConfigService.update(payload).pipe(
                    map(() => LicenseConfigActions.updateSuccess({ scope: payload.scope })),
                    catchError((error: HttpErrorResponse) =>
                        of(LicenseConfigActions.updateFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    // Tras guardar se recarga solo la sección afectada
    updateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseConfigActions.updateSuccess),
            tap(({ scope }) =>
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: scope === 'global' ? 'Configuración global actualizada' : 'Configuración de la empresa actualizada'
                })
            ),
            map(({ scope }) => (scope === 'global' ? LicenseConfigActions.loadGlobal() : LicenseConfigActions.loadOverrides()))
        )
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    LicenseConfigActions.loadGlobalFailure,
                    LicenseConfigActions.loadOverridesFailure,
                    LicenseConfigActions.updateFailure
                ),
                tap(({ error }) => this.messageService.add({ severity: 'error', summary: 'Error', detail: error }))
            ),
        { dispatch: false }
    );

    private extractError(error: HttpErrorResponse): string {
        return error.error?.message ?? error.message ?? 'Ha ocurrido un error inesperado';
    }
}
