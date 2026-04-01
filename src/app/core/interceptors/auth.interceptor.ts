import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';

/**
 * Interceptor de autenticación que agrega el Bearer token a las peticiones HTTP
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    // Skip para requests a assets (mock data)
    if (req.url.includes('/assets/') || req.url.includes('data/')) {
        return next(req);
    }

    // Obtener el token del signal
    const token = authService.token();
    
    // Si hay token, clonamos el request y agregamos el header de autorización
    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(authReq);
    }

    // Si no hay token, enviamos el request sin modificar
    return next(req);
};
