import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, delay, switchMap } from 'rxjs/operators';
import { LoginRequest, RefreshTokenResponse } from '../models/auth.model';
import { LoginResponse, LoginData } from '../models/login-response.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = `${environment.apiUrl}`;

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
    company = computed(() => this.sessionSignal()?.userCompany || null);
    permissions = computed(() => this.sessionSignal()?.userPermissions || []);
    menu = computed(() => this.sessionSignal()?.userMenu || []);
    isAuthenticated = computed(() => {
        const session = this.sessionSignal();
        if (!session?.userData) return false;
        const now = Date.now() / 1000;
        return session.userData.expiredsAt > now;
    });
    token = computed(() => this.sessionSignal()?.userData?.token || null);
    displayName = computed(() => {
        const user = this.user();
        return user ? `${user.names} ${user.lastNames}`.trim() : '';
    });

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
    login(email: string, password: string): Observable<LoginResponse> {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);
        const req: LoginRequest = { email, password };

        const obs = environment.useMockApi 
            ? this.mock.login(req) 
            : this.http.post<LoginResponse>(`${this.baseUrl}/admin/login`, req);

        return obs.pipe(
            tap((response: LoginResponse) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    // Normaliza expiredsAt a número si viene como string
                    if (response.data.userData && typeof response.data.userData.expiredsAt === 'string') {
                        response.data.userData.expiredsAt = Math.floor(Date.parse(response.data.userData.expiredsAt) / 1000);
                    }
                    this.setSession(response.data);
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Éxito', 
                        detail: 'Sesión iniciada correctamente',
                        life: 3000 
                    });
                    this.router.navigate(['/']);
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

        const obs = environment.useMockApi 
            ? this.mock.refreshToken() 
            : this.http.post<ApiResponse<RefreshTokenResponse>>(`${this.baseUrl}/admin/refresh`, {});

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

        const backendLogout$ = environment.useMockApi 
            ? this.mock.logout() 
            : this.http.post<ApiResponse<any>>(`${this.baseUrl}/admin/logout`, {});

        return backendLogout$.pipe(
            tap(() => {
                console.log('✅ Logout completado');
                this.messageService.add({ 
                    severity: 'info', 
                    summary: 'Sesión cerrada', 
                    detail: 'Se ha cerrado su sesión correctamente',
                    life: 3000 
                });
                this.router.navigate(['/auth/login']);
            }),
            catchError((error) => {
                console.error('❌ Error en logout:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Error al cerrar sesión',
                    life: 3000 
                });
                return throwError(() => error);
            })
        );
    }

    /**
     * Verifica si el usuario tiene un permiso específico
     */
    hasPermission(permissionCode: string): boolean {
        const perms = this.permissions();
        return !!perms.some((p) => p.code === permissionCode);
    }

    /**
     * Verifica si el usuario tiene acceso a un módulo por prefijo de code
     */
    hasModuleAccess(modulePrefix: string): boolean {
        const perms = this.permissions();
        if (!perms) return false;
        return perms.some((p) => p.code.startsWith(modulePrefix));
    }

    /**
     * Establece la sesión del usuario y actualiza el almacenamiento
     */
    setSession(session: LoginData): void {
        this.sessionSignal.set(session);
        this.session$.next(session);
        localStorage.setItem('auth_session', JSON.stringify(session));
    }

    /**
     * Limpia la sesión del usuario
     */
    clearSession(): void {
        this.sessionSignal.set(null);
        this.errorSignal.set(null);
        this.session$.next(null);
        localStorage.removeItem('auth_session');
    }

    /**
     * Inicializa el servicio desde el almacenamiento local
     */
    private initFromStorage(): void {
        try {
            const stored = localStorage.getItem('auth_session');
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
    private mock = {
        login: (req: LoginRequest) => {
            console.log('🔐 Mock login:', req);
            
            return this.http.get<any[]>('data/auth/test-credentials.json').pipe(
                switchMap((credentials) => {
                    const userConfig = credentials.find((c) => c.email === req.email);

                    if (!userConfig || userConfig.status !== 'active') {
                        return this.http.get<LoginResponse>('data/auth/login-error.json').pipe(delay(800));
                    }

                    // Validar password
                    if (userConfig.password !== req.password) {
                        return this.http.get<LoginResponse>('data/auth/login-error.json').pipe(delay(800));
                    }

                    return this.http.get<LoginResponse>('data/auth/login-success.json').pipe(delay(800));
                }),
                catchError(() => this.http.get<LoginResponse>('data/auth/login-error.json').pipe(delay(800)))
            );
        },
        
        refreshToken: () => 
            this.http.get<ApiResponse<RefreshTokenResponse>>('data/auth/refresh-token-success.json')
                .pipe(delay(500)),
        
        logout: () => 
            this.http.get<ApiResponse<any>>('data/auth/logout-success.json')
                .pipe(delay(300))
    };
}
