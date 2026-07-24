import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licence } from '@/core/models';
import { ApiResponse } from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenceService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}subscription/plans`;
    private pricingUrl = `${environment.adminApiUrl}role-type-pricings`;

    getLicences(): Observable<ApiResponse<Licence[]>> {
        return this.http.get<ApiResponse<Licence[]>>(this.apiUrl);
    }

    updateLicencePrice(id: number, amount: number): Observable<ApiResponse<unknown>> {
        return this.http.put<ApiResponse<unknown>>(this.pricingUrl, { id, data: { amount } });
    }
}
