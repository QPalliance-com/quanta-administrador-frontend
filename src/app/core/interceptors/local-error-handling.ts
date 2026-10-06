import { HttpContext, HttpContextToken } from '@angular/common/http';

/**
 * Marca una petición cuyos errores 4xx (salvo 401) los muestra el propio feature con el mensaje del backend,
 * en vez del toast genérico + redirección que hace `HttpErrorInterceptor`.
 */
export const LOCAL_ERROR_HANDLING = new HttpContextToken<boolean>(() => false);

export const localErrorHandling = (): HttpContext => new HttpContext().set(LOCAL_ERROR_HANDLING, true);
