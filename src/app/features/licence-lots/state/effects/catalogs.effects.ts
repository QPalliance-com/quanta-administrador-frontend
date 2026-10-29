import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CatalogService } from '@/core/services/catalog.service';
import { CatalogsActions } from '../actions/catalogs.actions';
import { selectPaymentTypesCountry, selectPeriodsLoaded } from '../selectors/catalogs.selectors';

@Injectable()
export class CatalogsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private catalogService = inject(CatalogService);
    private messageService = inject(MessageService);

    // Las formas de pago dependen del país de la company: la caché solo vale si el país ya cargado es el pedido.
    // Sin país no se llama (el backend responde 400)
    loadPaymentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalogsActions.loadPaymentTypes),
            withLatestFrom(this.store.select(selectPaymentTypesCountry)),
            filter(([{ countryCode }, loadedCountry]) => !!countryCode && countryCode !== loadedCountry),
            switchMap(([{ countryCode }]) =>
                this.catalogService.getPaymentTypesByCountry(countryCode).pipe(
                    map((response) => CatalogsActions.loadPaymentTypesSuccess({ countryCode, paymentTypes: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(CatalogsActions.loadFailure({ error: error.error?.message ?? error.message ?? 'No se pudieron cargar los catálogos' }))
                    )
                )
            )
        )
    );

    // Los periodos casi no cambian: se piden una sola vez y los diálogos los reutilizan desde el store
    loadPeriods$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalogsActions.loadPeriods),
            withLatestFrom(this.store.select(selectPeriodsLoaded)),
            filter(([, loaded]) => !loaded),
            switchMap(() =>
                this.catalogService.getPeriods().pipe(
                    map((response) => CatalogsActions.loadPeriodsSuccess({ periods: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(CatalogsActions.loadFailure({ error: error.error?.message ?? error.message ?? 'No se pudieron cargar los catálogos' }))
                    )
                )
            )
        )
    );

    // Sin catálogos los selects quedan vacíos: hay que avisar el motivo real (p. ej. 403 por no ser admin de Quanta)
    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CatalogsActions.loadFailure),
                tap(({ error }) => this.messageService.add({ severity: 'error', summary: 'No se cargaron los catálogos', detail: error }))
            ),
        { dispatch: false }
    );
}
