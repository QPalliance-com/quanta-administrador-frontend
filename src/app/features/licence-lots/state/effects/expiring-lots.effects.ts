import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { LicenceLotService } from '@/core/services/licence-lot.service';
import { ExpiringLotsActions } from '../actions/expiring-lots.actions';
import { LicenceLotsActions } from '../actions/licence-lots.actions';
import { selectExpiringLotsLoaded } from '../selectors/expiring-lots.selectors';

@Injectable()
export class ExpiringLotsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private licenceLotService = inject(LicenceLotService);

    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpiringLotsActions.loadExpiringLots),
            switchMap(() =>
                this.licenceLotService.getExpiring().pipe(
                    map((response) => ExpiringLotsActions.loadExpiringLotsSuccess({ lots: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            ExpiringLotsActions.loadExpiringLotsFailure({
                                error: error.error?.message ?? error.message ?? 'No se pudo cargar el panel de vencimientos'
                            })
                        )
                    )
                )
            )
        )
    );

    // Extender un lote desde el panel lo saca (o lo mueve) de los grupos: se refresca si el panel ya se había cargado
    reloadAfterExtend$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenceLotsActions.extendSuccess),
            withLatestFrom(this.store.select(selectExpiringLotsLoaded)),
            filter(([, loaded]) => loaded),
            map(() => ExpiringLotsActions.loadExpiringLots())
        )
    );
}
