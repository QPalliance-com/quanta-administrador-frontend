import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, BillingInvoice } from '@/core/models';
import { localErrorHandling } from '@/core/interceptors/local-error-handling';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BillingInvoiceService {
    private http = inject(HttpClient);
    private options = { context: localErrorHandling() };

    /** Facturas de una empresa, la más reciente primero. */
    getByCompany(companyId: number): Observable<ApiResponse<BillingInvoice[]>> {
        return this.http.get<ApiResponse<BillingInvoice[]>>(
            `${environment.adminApiUrl}companies/${companyId}/billing-invoices`,
            this.options
        );
    }

    downloadPdf(invoiceId: number): Observable<Blob> {
        return this.http.get(`${environment.adminApiUrl}billing-invoices/${invoiceId}/pdf`, {
            ...this.options,
            responseType: 'blob'
        });
    }
}
