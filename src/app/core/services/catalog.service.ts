import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaymentTypeCatalog, PeriodCatalog } from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}catalogs`;

    getPaymentTypes(): Observable<ApiResponse<PaymentTypeCatalog[]>> {
        return this.http.get<ApiResponse<PaymentTypeCatalog[]>>(`${this.apiUrl}/payment-types`);
    }

    getPeriods(): Observable<ApiResponse<PeriodCatalog[]>> {
        return this.http.get<ApiResponse<PeriodCatalog[]>>(`${this.apiUrl}/periods`);
    }
}
