import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { UserService } from '@/core/services';
import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private messageService = inject(MessageService);

    initUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.initUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((response) => {
                        // Se asume que hay una acción userActions.loadUsersSuccess
                        return userActions.loadUsersSuccess({ users: response.data });
                    }),
                    catchError((error) => of(userActions.loadUsersFailure({ error })))
                )
            )
        )
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.loadUser),
            mergeMap(({ id }) =>
                this.userService.getUser(id).pipe(
                    map((response) => userActions.loadUserSuccess({ user: response.data })),
                    catchError((error) => of(userActions.loadUserFailure({ error })))
                )
            )
        )
    );
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.updateUser),
            mergeMap(({ id, user }) =>
                this.userService.updateUser(id, user).pipe(
                    map((response) => userActions.updateUserSuccess({ user: response.data })),
                    catchError((error) => of(userActions.updateUserFailure({ error })))
                )
            )
        )
    );

    // Toasts de éxito
    loadUsersSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userActions.loadUsersSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuarios cargados correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    loadUserSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userActions.loadUserSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario cargado correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    updateUserSuccessToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userActions.updateUserSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario actualizado correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    // Toasts de error
    loadUsersFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userActions.loadUsersFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error || 'Error al cargar los usuarios'
                    });
                })
            ),
        { dispatch: false }
    );

    loadUserFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userActions.loadUserFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error || 'Error al cargar el usuario'
                    });
                })
            ),
        { dispatch: false }
    );

    updateUserFailureToast$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(userActions.updateUserFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error || 'Error al actualizar el usuario'
                    });
                })
            ),
        { dispatch: false }
    );
}
