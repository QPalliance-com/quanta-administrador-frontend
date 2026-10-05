import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, forkJoin, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CatalogService } from '@/core/services/catalog.service';
import { CatalogsActions } from '../actions/catalogs.actions';
import { selectCatalogsLoaded } from '../selectors/catalogs.selectors';

@Injectable()
export class CatalogsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private catalogService = inject(CatalogService);

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
}
