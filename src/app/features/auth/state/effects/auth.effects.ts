import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@/core/services/auth.service';
import { LoginData } from '@/core/models/login-response.model';
import { LoggedUser } from '@/core/models/auth.model';
import * as AuthActions from '../actions/auth.actions';
import { initLocationData } from '@/core/state/actions/department-city.actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    initializeAuth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.initializeAuth),
            switchMap(() => {
                const session = this.authService.getStoredSession();
                if (session) {
                    return of(AuthActions.autoLoginSuccess({ loginData: session }));
                }
                return of(AuthActions.autoLoginFailure({ error: 'No hay sesión válida' }));
            }),
            catchError((error) => of(AuthActions.autoLoginFailure({
                error: error.message || 'Error al inicializar autenticación'
            })))
        );
    });

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((response) => {
                        if (response.success && response.data) {
                            const expiresAt = response.data.expiredAt ?? response.data.expiresAt ?? 0;
                            const expiredsAt = typeof expiresAt === 'string'
                                ? Math.floor(Date.parse(expiresAt) / 1000)
                                : Number(expiresAt);

                            const userData: LoggedUser = {
                                token: response.data.token,
                                expiredsAt,
                                ...(response.data.userData ?? {})
                            };

                            const loginData: LoginData = {
                                userCompany: null,
                                userMenu: [],
                                userPermissions: [],
                                userData
                            };

                            this.authService.saveSession(loginData);
                            return AuthActions.loginSuccess({ loginData });
                        }
                        return AuthActions.loginFailure({ error: response.message || 'Error al iniciar sesión' });
                    }),
                    catchError((error: any) => {
                        const errorMessage = error.error?.message
                            || error.message
                            || 'Error al iniciar sesión';
                        return of(AuthActions.loginFailure({ error: errorMessage }));
                    })
                )
            )
        );
    });

    loginSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ loginData }) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Bienvenido',
                        detail: `Hola ${loginData.userData.names ?? ''}, sesión iniciada correctamente`,
                        life: 3000
                    });
                    this.router.navigate(['/']);
                })
            );
        },
        { dispatch: false }
    );

    loginFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error de autenticación',
                        detail: error,
                        life: 5000
                    });
                })
            );
        },
        { dispatch: false }
    );

    autoLoginSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.autoLoginSuccess),
                tap(() => {
                    console.log('✅ Auto login exitoso');
                })
            );
        },
        { dispatch: false }
    );

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() =>
                this.authService.logout().pipe(
                    map(() => AuthActions.logoutSuccess()),
                    catchError((error: any) => {
                        const errorMessage = error.error?.message
                            || error.message
                            || 'Error al cerrar sesión';
                        return of(AuthActions.logoutFailure({ error: errorMessage }));
                    })
                )
            )
        );
    });

    logoutSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => {
                    this.authService.clearSession();
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Sesión cerrada',
                        detail: 'Has cerrado sesión correctamente',
                        life: 3000
                    });
                    this.router.navigate(['/auth/login'], { replaceUrl: true });
                })
            );
        },
        { dispatch: false }
    );

    logoutFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.logoutFailure),
                tap(({ error }) => {
                    this.authService.clearSession();
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error al cerrar sesión',
                        detail: error,
                        life: 5000
                    });
                    this.router.navigate(['/auth/login'], { replaceUrl: true });
                })
            );
        },
        { dispatch: false }
    );

    loadLocationOnAuth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess, AuthActions.autoLoginSuccess),
            map(() => initLocationData())
        );
    });

    sessionExpired$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.sessionExpired),
                tap(() => {
                    this.authService.clearSession();
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Sesión expirada',
                        detail: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                        life: 5000
                    });
                    this.router.navigate(['/auth/login']);
                })
            );
        },
        { dispatch: false }
    );
}
