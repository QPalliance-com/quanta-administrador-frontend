import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401:
                            // No autorizado: redirige al login
                            this.router.navigate(['/login']);
                            break;

                        case 403:
                            // Prohibido: sin permisos
                            this.router.navigate(['/forbidden']);
                            break;

                        case 404:
                            // Recurso no encontrado
                            this.router.navigate(['/not-found']);
                            break;

                        case 0:
                            // Error de red o sin conexión
                            this.router.navigate(['/server-error']);
                            break;

                        case 500:
                        default:
                            // Error del servidor u otro desconocido
                            this.router.navigate(['/server-error']);
                            break;
                    }
                }

                return throwError(() => error);
            })
        );
    }
}
