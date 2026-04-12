import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, RefreshTokenResponse, LoggedUser } from '../models/auth.model';
import { LoginData } from '../models/login-response.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = `${environment.authApiUrl}`;

    // Core signals
    private sessionSignal = signal<LoginData | null>(null);
    private loadingSignal = signal(false);
    private errorSignal = signal<string | null>(null);

    // Public read-only signals
    session = this.sessionSignal.asReadonly();
    loading = this.loadingSignal.asReadonly();
    error = this.errorSignal.asReadonly();

    // Computed properties
    user = computed(() => this.sessionSignal()?.userData || null);
    isAuthenticated = computed(() => {
        const session = this.sessionSignal();
        if (!session?.userData) return false;
        const now = Date.now() / 1000;
        return session.userData.expiredsAt > now;
    });
    token = computed(() => this.sessionSignal()?.userData?.token || null);

    // Keep BehaviorSubject for backward compatibility with interceptors
    private session$ = new BehaviorSubject<LoginData | null>(null);
    public readonly currentSession$ = this.session$.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) {
        this.initFromStorage();
    }

    /**
     * Realiza login directo con email y password
     */
    login(email: string, password: string): Observable<ApiResponse<{ token: string; expiredAt: number; expiresAt?: number; userData?: LoggedUser }>> {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        const req: LoginRequest = { email, password };
        const payload = { data: req };

        const obs = this.http.post<ApiResponse<{ token: string; expiredAt: number; expiresAt?: number; userData?: LoggedUser }>>(`${this.baseUrl}admin/login`, payload);

        return obs.pipe(
            tap((response) => {
                this.loadingSignal.set(false);
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

                    this.setSession({
                        userCompany: null,
                        userMenu: [],
                        userPermissions: [],
                        userData
                    });
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Éxito', 
                        detail: 'Sesión iniciada correctamente',
                        life: 3000 
                    });
                    this.router.navigate(['/dashboard']);
                } else {
                    throw new Error(response.message || 'Login failed');
                }
            }),
            catchError((error) => {
                this.loadingSignal.set(false);
                const errMsg = error?.error?.message || 'Error en login';
                this.errorSignal.set(errMsg);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: errMsg,
                    life: 3000 
                });
                return throwError(() => error);
            })
        );
    }

    /**
     * Renueva el token de acceso usando el refresh token
     */
    refreshToken(): Observable<ApiResponse<RefreshTokenResponse>> {
        const session = this.sessionSignal();
        if (!session?.userData?.token) {
            return throwError(() => new Error('No hay token disponible'));
        }

        const obs = this.http.post<ApiResponse<RefreshTokenResponse>>(`${this.baseUrl}refresh`, {});

        return obs.pipe(
            tap((response) => {
                if (response.success && response.data && session) {
                    const updated = {
                        ...session,
                        userData: {
                            ...session.userData,
                            token: response.data.token,
                            expiredsAt: typeof response.data.expiresAt === 'string' 
                                ? Math.floor(Date.parse(response.data.expiresAt) / 1000) 
                                : Number(response.data.expiresAt)
                        }
                    };
                    this.setSession(updated);
                }
            })
        );
    }

    /**
     * Cierra la sesión del usuario
     */
    logout(): Observable<ApiResponse<any>> {
        console.log('🚪 Iniciando logout...');
        
        this.clearSession();

        const backendLogout$ = this.http.post<ApiResponse<any>>(`${this.baseUrl}logout`, {});

        return backendLogout$.pipe(
            tap(() => {
                console.log('✅ Logout completado');
                this.messageService.add({ 
                    severity: 'info', 
                    summary: 'Sesión cerrada', 
                    detail: 'Se ha cerrado su sesión correctamente',
                    life: 3000 
                });
                // Navegar a login después de un pequeño delay
                setTimeout(() => {
                    this.router.navigate(['/auth/login'], { replaceUrl: true });
                }, 500);
            }),
            catchError((error) => {
                console.error('❌ Error en logout:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Error al cerrar sesión',
                    life: 3000 
                });
                // Aún así navegar a login aunque falle el backend
                setTimeout(() => {
                    this.router.navigate(['/auth/login'], { replaceUrl: true });
                }, 500);
                return throwError(() => error);
            })
        );
    }

    /**
     * Verifica si el usuario tiene un permiso específico
     */
    // hasPermission(permissionCode: string): boolean {
    //     const perms = this.permissions();
    //     return !!perms.some((p) => p.code === permissionCode);
    // }

    // /**
    //  * Verifica si el usuario tiene acceso a un módulo por prefijo de code
    //  */
    // hasModuleAccess(modulePrefix: string): boolean {
    //     const perms = this.permissions();
    //     if (!perms) return false;
    //     return perms.some((p) => p.code.startsWith(modulePrefix));
    // }

    /**
     * Establece la sesión del usuario y actualiza el almacenamiento
     */
    setSession(session: LoginData): void {
        this.sessionSignal.set(session);
        this.session$.next(session);
        sessionStorage.setItem('auth_session', JSON.stringify(session));
    }

    /**
     * Limpia la sesión del usuario
     */
    clearSession(): void {
        this.sessionSignal.set(null);
        this.errorSignal.set(null);
        this.session$.next(null);
        sessionStorage.removeItem('auth_session');
    }

    /**
     * Inicializa el servicio desde el almacenamiento local
     */
    private initFromStorage(): void {
        try {
            const stored = sessionStorage.getItem('auth_session');
            if (stored) {
                const session: LoginData = JSON.parse(stored);
                // Verificar que la sesión no haya expirado
                if (session.userData && session.userData.expiredsAt > Date.now() / 1000) {
                    this.sessionSignal.set(session);
                    this.session$.next(session);
                } else {
                    this.clearSession();
                }
            }
        } catch (e) {
            this.clearSession();
        }
    }

    /**
     * Mocks para desarrollo
     */
    // No se usa mock en este servicio simplificado.
}

