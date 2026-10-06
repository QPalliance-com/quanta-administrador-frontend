import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaymentTypeCatalog, PeriodCatalog } from '@/core/models';
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
}
