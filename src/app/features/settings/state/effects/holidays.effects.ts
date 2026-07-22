import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HolidayService } from '@/core/services/holiday.service';
import { HolidaysActions } from '../actions/holidays.actions';
import { selectSelectedYear } from '../selectors/holidays.selectors';

@Injectable()
export class HolidaysEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private holidayService = inject(HolidayService);
    private messageService = inject(MessageService);

    loadList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.loadList),
            switchMap(({ year }) =>
                this.holidayService.getByYear(year).pipe(
                    map((response) => HolidaysActions.loadListSuccess({ data: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(HolidaysActions.loadListFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.create),
            exhaustMap(({ payload }) =>
                this.holidayService.create(payload).pipe(
                    map((response) => HolidaysActions.createSuccess({ item: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(HolidaysActions.createFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    createSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.createSuccess),
            tap(() =>
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Día no laborable creado correctamente'
                })
            ),
            withLatestFrom(this.store.select(selectSelectedYear)),
            map(([, year]) => HolidaysActions.loadList({ year }))
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.update),
            exhaustMap(({ id, payload }) =>
                this.holidayService.update(id, payload).pipe(
                    map((response) => HolidaysActions.updateSuccess({ item: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(HolidaysActions.updateFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    updateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.updateSuccess),
            tap(() =>
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Día no laborable actualizado correctamente'
                })
            ),
            withLatestFrom(this.store.select(selectSelectedYear)),
            map(([, year]) => HolidaysActions.loadList({ year }))
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.delete),
            exhaustMap(({ id }) =>
                this.holidayService.delete(id).pipe(
                    map(() => HolidaysActions.deleteSuccess({ id })),
                    catchError((error: HttpErrorResponse) =>
                        of(HolidaysActions.deleteFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    deleteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.deleteSuccess),
            tap(() =>
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Día no laborable eliminado correctamente'
                })
            ),
            withLatestFrom(this.store.select(selectSelectedYear)),
            map(([, year]) => HolidaysActions.loadList({ year }))
        )
    );

    importBatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.importBatch),
            exhaustMap(({ payload }) =>
                this.holidayService.batchImport(payload).pipe(
                    map((response) => HolidaysActions.importBatchSuccess({ result: response.data })),
                    catchError((error: HttpErrorResponse) =>
                        of(HolidaysActions.importBatchFailure({ error: this.extractError(error) }))
                    )
                )
            )
        )
    );

    // Solo refresca el listado cuando la importación realmente persistió algo
    // (si vino con conflictos pendientes de decisión, el dialog aún no terminó el flujo)
    importBatchSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HolidaysActions.importBatchSuccess),
            filter(({ result }) => (result.created > 0 || result.overwritten > 0) && !result.conflicts?.length),
            withLatestFrom(this.store.select(selectSelectedYear)),
            map(([, year]) => HolidaysActions.loadList({ year }))
        )
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    HolidaysActions.loadListFailure,
                    HolidaysActions.createFailure,
                    HolidaysActions.updateFailure,
                    HolidaysActions.deleteFailure,
                    HolidaysActions.importBatchFailure
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

    private extractError(error: HttpErrorResponse): string {
        return error.error?.message ?? error.message ?? 'Ha ocurrido un error inesperado';
    }
}
