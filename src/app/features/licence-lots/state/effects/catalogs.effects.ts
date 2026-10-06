import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, forkJoin, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CatalogService } from '@/core/services/catalog.service';
import { CatalogsActions } from '../actions/catalogs.actions';
import { selectCatalogsLoaded } from '../selectors/catalogs.selectors';

@Injectable()
export class CatalogsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private catalogService = inject(CatalogService);
    private messageService = inject(MessageService);

    // Los catálogos casi no cambian: se piden una sola vez y los drawers los reutilizan desde el store
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalogsActions.load),
            withLatestFrom(this.store.select(selectCatalogsLoaded)),
            filter(([, loaded]) => !loaded),
            switchMap(() =>
                forkJoin({
                    paymentTypes: this.catalogService.getPaymentTypes(),
                    periods: this.catalogService.getPeriods()
                }).pipe(
                    map(({ paymentTypes, periods }) =>
                        CatalogsActions.loadSuccess({ paymentTypes: paymentTypes.data, periods: periods.data })
                    ),
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
