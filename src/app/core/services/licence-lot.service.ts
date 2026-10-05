import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, LicenceLotList } from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenceLotService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}companies`;

    private lotsUrl(companyId: number): string {
        return `${this.apiUrl}/${companyId}/licence-lots`;
    }

    getByCompany(companyId: number): Observable<ApiResponse<LicenceLotList>> {
        return this.http.get<ApiResponse<LicenceLotList>>(this.lotsUrl(companyId));
    }
}
