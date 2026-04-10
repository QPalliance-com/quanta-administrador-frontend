import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private messageService: MessageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401:
                            // No autorizado: redirige al login
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'No autorizado',
                                detail: 'Tu sesión ha expirado o no tienes autorización. Inicia sesión nuevamente.'
                            });
                            this.router.navigate(['/auth/login']);
                            break;

                        case 403:
                            // Prohibido: sin permisos
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Acceso prohibido',
                                detail: 'No tienes permisos para acceder a este recurso.'
                            });
                            this.router.navigate(['/forbidden']);
                            break;

                        case 404:
                            // Recurso no encontrado
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'No encontrado',
                                detail: 'El recurso solicitado no existe.'
                            });
                            this.router.navigate(['/not-found']);
                            break;

                        case 0:
                            // Error de red o sin conexión
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Sin conexión',
                                detail: 'Sin conexión al servidor. Verifica tu internet e intenta de nuevo.'
                            });
                            break;

                        case 500:
                        default:
                            // Error del servidor u otro desconocido
                            console.error('💥 Error del servidor:', error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error del servidor',
                                detail: 'Ha ocurrido un error en el servidor. Por favor, intenta nuevamente o recarga la página.'
                            });
                            break;
                    }
                }

                return throwError(() => error);
            })
        );
    }
}
