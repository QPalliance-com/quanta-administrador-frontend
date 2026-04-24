import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserService } from '@/core/services/user.service';
import { UsersActions } from '../actions/users.actions';

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((response) => UsersActions.loadUsersSuccess({ users: response.data })),
                    catchError((error) =>
                        of(UsersActions.loadUsersFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUser),
            mergeMap(({ id }) =>
                this.userService.getUser(id).pipe(
                    map((response) => UsersActions.loadUserSuccess({ user: response.data as any })),
                    catchError((error) =>
                        of(UsersActions.loadUserFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.createUser),
            mergeMap(({ user }) =>
                this.userService.createUser(user).pipe(
                    map((response) => UsersActions.createUserSuccess({ user: response.data })),
                    catchError((error) =>
                        of(UsersActions.createUserFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    createUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UsersActions.createUserSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario creado correctamente'
                    });
                    this.router.navigate(['/users/list']);
                })
            ),
        { dispatch: false }
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.updateUser),
            mergeMap(({ id, user }) =>
                this.userService.updateUser(id, user).pipe(
                    map((response) => UsersActions.updateUserSuccess({ user: response.data })),
                    catchError((error) =>
                        of(UsersActions.updateUserFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UsersActions.updateUserSuccess),
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

    updateUserStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.updateUserStatus),
            mergeMap(({ id, status }) =>
                this.userService.updateUserStatus(id, status).pipe(
                    map((response) => UsersActions.updateUserStatusSuccess({ user: response.data })),
                    catchError((error) =>
                        of(UsersActions.updateUserStatusFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateUserStatusSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UsersActions.updateUserStatusSuccess),
                tap(({ user }) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: `Usuario ${user.status === 'active' ? 'activado' : 'inactivado'} correctamente`
                    });
                })
            ),
        { dispatch: false }
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.deleteUser),
            mergeMap(({ id }) =>
                this.userService.deleteUser(id).pipe(
                    map(() => UsersActions.deleteUserSuccess({ id })),
                    catchError((error) =>
                        of(UsersActions.deleteUserFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    deleteUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UsersActions.deleteUserSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario eliminado correctamente'
                    });
                })
            ),
        { dispatch: false }
    );

    failure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    UsersActions.loadUsersFailure,
                    UsersActions.loadUserFailure,
                    UsersActions.createUserFailure,
                    UsersActions.updateUserFailure,
                    UsersActions.updateUserStatusFailure,
                    UsersActions.deleteUserFailure
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
}
