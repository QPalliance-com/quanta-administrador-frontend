import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, RefreshTokenResponse, LoggedUser } from '../models/auth.model';
import { LoginData } from '../models/login-response.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private readonly baseUrl = environment.authApiUrl;

    private readonly sessionSignal = signal<LoginData | null>(this.loadFromStorage());

    readonly token = computed(() => this.sessionSignal()?.userData?.token ?? null);
    readonly isAuthenticated = computed(() => {
        const session = this.sessionSignal();
        if (!session?.userData) return false;
        return session.userData.expiredsAt > Date.now() / 1000;
    });

    session = this.sessionSignal.asReadonly();

    login(email: string, password: string): Observable<ApiResponse<{ token: string; expiredAt: number; expiresAt?: number; userData?: LoggedUser }>> {
        const req: LoginRequest = { email, password };
        return this.http.post<ApiResponse<{ token: string; expiredAt: number; expiresAt?: number; userData?: LoggedUser }>>(
            `${this.baseUrl}admin/login`,
            { data: req }
        );
    }

    refreshToken(): Observable<ApiResponse<RefreshTokenResponse>> {
        return this.http.post<ApiResponse<RefreshTokenResponse>>(`${this.baseUrl}refresh`, {});
    }

    logout(): Observable<ApiResponse<void>> {
        return this.http.post<ApiResponse<void>>(`${this.baseUrl}logout`, {});
    }

    saveSession(session: LoginData): void {
        this.sessionSignal.set(session);
        sessionStorage.setItem('auth_session', JSON.stringify(session));
    }

    clearSession(): void {
        this.sessionSignal.set(null);
        sessionStorage.removeItem('auth_session');
    }

    getStoredSession(): LoginData | null {
        try {
            const stored = sessionStorage.getItem('auth_session');
            if (!stored) return null;
            const session = JSON.parse(stored) as LoginData;
            return session.userData?.expiredsAt > Date.now() / 1000 ? session : null;
        } catch {
            return null;
        }
    }

    private loadFromStorage(): LoginData | null {
        try {
            const stored = sessionStorage.getItem('auth_session');
            if (!stored) return null;
            const session = JSON.parse(stored) as LoginData;
            return session.userData?.expiredsAt > Date.now() / 1000 ? session : null;
        } catch {
            return null;
        }
    }
}
