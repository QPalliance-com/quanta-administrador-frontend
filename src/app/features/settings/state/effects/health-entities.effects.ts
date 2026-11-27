import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HealthEntityService } from '@/core/services/health-entity.service';
import { HealthEntitiesActions } from '../actions/health-entities.actions';
import { selectHealthEntitiesLastQuery } from '../selectors/health-entities.selectors';

@Injectable()
export class HealthEntitiesEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private healthEntityService = inject(HealthEntityService);
    private messageService = inject(MessageService);

    loadList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HealthEntitiesActions.loadList),
            switchMap(({ query }) =>
                this.healthEntityService.getAll(query).pipe(
                    map((response) => HealthEntitiesActions.loadListSuccess({ items: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(HealthEntitiesActions.loadListFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HealthEntitiesActions.create),
            exhaustMap(({ payload }) =>
                this.healthEntityService.create(payload).pipe(
                    map((response) => HealthEntitiesActions.createSuccess({ id: response.data.id })),
                    catchError((error: HttpErrorResponse) =>
                        of(HealthEntitiesActions.createFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HealthEntitiesActions.update),
            exhaustMap(({ id, countryCode, payload }) =>
                this.healthEntityService.update(id, countryCode, payload).pipe(
                    map((response) => HealthEntitiesActions.updateSuccess({ id: response.data.id })),
                    catchError((error: HttpErrorResponse) =>
                        of(HealthEntitiesActions.updateFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HealthEntitiesActions.delete),
            exhaustMap(({ id, countryCode }) =>
                this.healthEntityService.delete(id, countryCode).pipe(
                    map(() => HealthEntitiesActions.deleteSuccess({ id })),
                    catchError((error: HttpErrorResponse) =>
                        of(HealthEntitiesActions.deleteFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    successToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    HealthEntitiesActions.createSuccess,
                    HealthEntitiesActions.updateSuccess,
                    HealthEntitiesActions.deleteSuccess
                ),
                tap((action) =>
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: this.successMessage(action.type)
                    })
                )
            ),
        { dispatch: false }
    );

    reloadAfterChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                HealthEntitiesActions.createSuccess,
                HealthEntitiesActions.updateSuccess,
                HealthEntitiesActions.deleteSuccess
            ),
            withLatestFrom(this.store.select(selectHealthEntitiesLastQuery)),
            filter(([, query]) => !!query),
            map(([, query]) => HealthEntitiesActions.loadList({ query: query! }))
        )
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    HealthEntitiesActions.loadListFailure,
                    HealthEntitiesActions.createFailure,
                    HealthEntitiesActions.updateFailure,
                    HealthEntitiesActions.deleteFailure
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

    private successMessage(type: string): string {
        if (type === HealthEntitiesActions.createSuccess.type) return 'Entidad de salud creada correctamente';
        if (type === HealthEntitiesActions.updateSuccess.type) return 'Entidad de salud actualizada correctamente';
        return 'Entidad de salud eliminada correctamente';
    }

    private extractError(error: HttpErrorResponse): string {
        return error.error?.message ?? error.message ?? 'Ha ocurrido un error inesperado';
    }
}
