import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AccountingProviderService } from '@/core/services/accounting-provider.service';
import { AccountingProviderActions } from '../actions/accounting-provider.actions';

@Injectable()
export class AccountingProviderEffects {
    private actions$ = inject(Actions);
    private service = inject(AccountingProviderService);
    private messageService = inject(MessageService);

    loadConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountingProviderActions.loadConfig),
            switchMap(({ companyId }) =>
                this.service.getConfig(companyId).pipe(
                    map((response) => AccountingProviderActions.loadConfigSuccess({ companyId, config: response.data ?? null })),
                    catchError((error: HttpErrorResponse) =>
                        of(AccountingProviderActions.loadConfigFailure({ error: this.extractError(error, 'No se pudo cargar la configuración del facturador') }))
                    )
                )
            )
        )
    );

    loadProviders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountingProviderActions.loadProviders),
            switchMap(() =>
                this.service.getProviders().pipe(
                    map((response) => AccountingProviderActions.loadProvidersSuccess({ providers: response.data ?? [] })),
                    catchError((error: HttpErrorResponse) =>
                        of(AccountingProviderActions.loadProvidersFailure({ error: this.extractError(error, 'No se pudo cargar la lista de proveedores') }))
                    )
                )
            )
        )
    );

    saveCredentials$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountingProviderActions.saveCredentials),
            switchMap(({ companyId, request }) =>
                this.service.saveCredentials(companyId, request).pipe(
                    map(() => AccountingProviderActions.saveCredentialsSuccess({ companyId, environment: request.environment })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            AccountingProviderActions.saveCredentialsFailure({
                                environment: request.environment,
                                message: this.extractError(error, 'No se pudieron guardar las credenciales'),
                                inline: error.status === 422
                            })
                        )
                    )
                )
            )
        )
    );

    // Tras guardar se recarga la config: el backend es la fuente de testConnected/prodConnected
    reloadConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountingProviderActions.saveCredentialsSuccess),
            map(({ companyId }) => AccountingProviderActions.loadConfig({ companyId }))
        )
    );

    saveFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AccountingProviderActions.saveCredentialsFailure),
                filter(({ inline }) => !inline),
                tap(({ message }) => this.messageService.add({ severity: 'error', summary: 'Facturador electrónico', detail: message }))
            ),
        { dispatch: false }
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AccountingProviderActions.loadConfigFailure, AccountingProviderActions.loadProvidersFailure),
                tap(({ error }) => this.messageService.add({ severity: 'error', summary: 'Facturador electrónico', detail: error }))
            ),
        { dispatch: false }
    );

    // 5xx o sin red: mensaje genérico; si no, el mensaje del backend
    private extractError(error: HttpErrorResponse, fallback: string): string {
        if (error.status === 0 || error.status >= 500) return fallback;
        return error.error?.message ?? fallback;
    }
}
