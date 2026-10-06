import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, MercadoPagoPaymentFilters, MercadoPagoPaymentsPage } from '@/core/models';
import { localErrorHandling } from '@/core/interceptors/local-error-handling';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MercadoPagoPaymentService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}mercadopago/payments`;

    /** Solo lectura. Los filtros vacíos no se envían: sin fechas el backend busca los últimos 7 días. */
    search(filters: MercadoPagoPaymentFilters): Observable<ApiResponse<MercadoPagoPaymentsPage>> {
        let params = new HttpParams();
        for (const [key, value] of Object.entries(filters)) {
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, String(value));
            }
        }
        return this.http.get<ApiResponse<MercadoPagoPaymentsPage>>(this.apiUrl, { params, context: localErrorHandling() });
    }
}
