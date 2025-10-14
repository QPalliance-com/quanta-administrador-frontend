import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuService } from '../../../components/layout/services/menu.service';
import { MenuActions } from '../actions/menu.actions';
import { MessageService } from 'primeng/api';

@Injectable()
export class MenuEffects {
    private actions$ = inject(Actions);
    private menuService = inject(MenuService);
    private messageService = inject(MessageService);

    loadMenu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MenuActions.loadMenu),
            switchMap(() =>
                this.menuService.getMenu().pipe(
                    map((response) => MenuActions.loadMenuSuccess({ menu: response.data })),
                    catchError((error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al cargar el menú',
                            life: 3000
                        });
                        return of(MenuActions.loadMenuFailure({ error: error.message }));
                    })
                )
            )
        )
    );

    loadMenuSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MenuActions.loadMenuSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Menú cargado correctamente',
                        life: 3000
                    });
                })
            ),
        { dispatch: false }
    );
}
