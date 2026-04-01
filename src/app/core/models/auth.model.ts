import { User } from './user.model';
import { Permission } from './permission.model';
import { AppMenu } from './menu.model';
import { Company } from './company.model';
import { ApiResponse } from './api-response.model';

// Enum para tipos de autenticación (Solo INTERNAL para admin)
export enum AuthMethod {
    INTERNAL = 'INTERNAL' // Autenticación interna con email/password
}

// Request para login interno con email/password
export interface LoginRequest {
    email: string;
    password: string;
}

// Usuario logueado con información completa
export interface LoggedUser extends User {
    token: string;
    expiredsAt: number;
}

// Interfaces para refresh token
export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    token: string;
    refreshToken?: string;
    expiresAt: string | number;
}

// Estados del flujo de autenticación simplificado para admin
export type AuthStep = 'login' | 'authenticated' | 'error';

// Estado de NgRx para autenticación simplificada
export interface AuthState {
    // Usuario logueado exitosamente
    loggedUser: LoggedUser | null;

    // Compañía del super admin
    userCompany: Company | null;

    // Permisos y menú del usuario
    userPermissions: Permission[];
    userMenu: AppMenu[];

    // Estados de carga y error
    loading: boolean;
    error: string | null;
}
