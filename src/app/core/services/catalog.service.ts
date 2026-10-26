import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getPeriods(): Observable<ApiResponse<PeriodCatalog[]>> {
        return this.http.get<ApiResponse<PeriodCatalog[]>>(`${this.apiUrl}/periods`, this.options);
    }

    // Cuelga de la base admin (no de /catalogs) y sin localErrorHandling: el interceptor global muestra el toast
    getCountries(): Observable<ApiResponse<CountryCatalog[]>> {
        return this.http.get<ApiResponse<CountryCatalog[]>>(`${environment.adminApiUrl}countries`);
    }
}
