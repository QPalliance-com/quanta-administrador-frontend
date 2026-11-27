import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, CountryCatalog, PaymentTypeCatalog, PeriodCatalog } from '@/core/models';
import { localErrorHandling } from '@/core/interceptors/local-error-handling';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}catalogs`;
    private options = { context: localErrorHandling() };

    getPaymentTypes(): Observable<ApiResponse<PaymentTypeCatalog[]>> {
        return this.http.get<ApiResponse<PaymentTypeCatalog[]>>(`${this.apiUrl}/payment-types`, this.options);
    }

    // Cuelga de la base admin (no de /catalogs): devuelve las formas de pago del país y las globales (country null)
    getPaymentTypesByCountry(countryCode: string): Observable<ApiResponse<PaymentTypeCatalog[]>> {
        const params = new HttpParams().set('countryCode', countryCode);
        return this.http.get<ApiResponse<PaymentTypeCatalog[]>>(`${environment.adminApiUrl}payment-type-catalog`, { ...this.options, params });
    }

    getPeriods(): Observable<ApiResponse<PeriodCatalog[]>> {
        return this.http.get<ApiResponse<PeriodCatalog[]>>(`${this.apiUrl}/periods`, this.options);
    }

    // Cuelga de la base admin (no de /catalogs) y sin localErrorHandling: el interceptor global muestra el toast
    getCountries(): Observable<ApiResponse<CountryCatalog[]>> {
        return this.http.get<ApiResponse<CountryCatalog[]>>(`${environment.adminApiUrl}countries`);
    }
}
