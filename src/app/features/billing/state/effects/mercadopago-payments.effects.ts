import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { MercadoPagoPaymentService } from '@/core/services/mercadopago-payment.service';
import { MercadoPagoPaymentsActions } from '../actions/mercadopago-payments.actions';

@Injectable()
export class MercadoPagoPaymentsEffects {
    private actions$ = inject(Actions);
    private paymentService = inject(MercadoPagoPaymentService);

    // switchMap: si el usuario cambia de página o de filtros mientras carga, se descarta la respuesta anterior
    search$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MercadoPagoPaymentsActions.search),
            switchMap(({ filters }) =>
                this.paymentService.search(filters).pipe(
                    map((response) => MercadoPagoPaymentsActions.searchSuccess({ result: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(MercadoPagoPaymentsActions.searchFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    // El error se muestra dentro de la pantalla (con "Reintentar"), no como toast. El 401 lo resuelve el interceptor global.
    private extractError(error: HttpErrorResponse): string {
        if (error.status === 502) {
            return 'MercadoPago no respondió, inténtalo de nuevo.';
        }
        if (error.status === 400) {
            return error.error?.message ?? 'Filtros inválidos: revisa la página, el tamaño o que la fecha inicial no sea posterior a la final.';
        }
        // 403 APPLICATION - 50: el backend ya devuelve "Esta acción es exclusiva de los administradores de Quanta"
        return error.error?.message ?? error.message ?? 'No se pudieron cargar los pagos de MercadoPago.';
    }
}
