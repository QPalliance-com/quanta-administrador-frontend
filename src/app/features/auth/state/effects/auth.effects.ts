import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@/core/services/auth.service';
import { LoginResponse } from '@/core/models/login-response.model';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    // Initialize Auth State
    initializeAuth$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.initializeAuth),
            switchMap(() => {
                // Verificar si hay una sesión válida almacenada
                const session = this.authService.getCurrentSession();

                if (session && this.authService.isAuthenticated()) {
                    return of(AuthActions.autoLoginSuccess({ loginData: session }));
                }

                return of(AuthActions.autoLoginFailure({ 
                    error: 'No hay sesión válida' 
                }));
            }),
            catchError((error) => of(AuthActions.autoLoginFailure({ 
                error: error.message || 'Error al inicializar autenticación' 
            })))
        );
    });

    // Login
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((response: LoginResponse) => {
                        if (response.success && response.data) {
                            return AuthActions.loginSuccess({ loginData: response.data });
                        }
                        return AuthActions.loginFailure({
                            error: response.message || 'Error al iniciar sesión'
                        });
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

    // Login Success - Navigate to dashboard
    loginSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ loginData }) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Bienvenido',
                        detail: `Hola ${loginData.userData.names}, sesión iniciada correctamente`,
                        life: 3000
                    });
                    
                    // Navigate to dashboard
                    this.router.navigate(['/']);
                })
            );
        },
        { dispatch: false }
    );

    // Login Failure - Show error message
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

    // Auto Login Success
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

    // Logout
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

    // Logout Success - Navigate to login
    logoutSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Sesión cerrada',
                        detail: 'Has cerrado sesión correctamente',
                        life: 3000
                    });
                    
                    // Clear local storage and navigate to login
                    localStorage.removeItem('auth_session');
                    this.router.navigate(['/auth/login'], { replaceUrl: true });
                })
            );
        },
        { dispatch: false }
    );

    // Logout Failure - Show error and navigate
    logoutFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.logoutFailure),
                tap(({ error }) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error al cerrar sesión',
                        detail: error,
                        life: 5000
                    });
                    
                    // Even if backend fails, still navigate to login after clearing session
                    localStorage.removeItem('auth_session');
                    this.router.navigate(['/auth/login'], { replaceUrl: true });
                })
            );
        },
        { dispatch: false }
    );

    // Session Expired - Navigate to login
    sessionExpired$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.sessionExpired),
                tap(() => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Sesión expirada',
                        detail: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                        life: 5000
                    });
                    
                    // Navigate to login
                    this.router.navigate(['/auth/login']);
                })
            );
        },
        { dispatch: false }
    );
}
