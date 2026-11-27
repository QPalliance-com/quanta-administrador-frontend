import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '@/core/models/api-response.model';
import { HealthEntityType } from '@/core/models/health-entity-type.model';

@Injectable({ providedIn: 'root' })
export class HealthEntityTypeService {
    private http = inject(HttpClient);
    private readonly baseUrl = environment.adminApiUrl;

    getByCountry(countryCode: string) {
        const params = new HttpParams().set('countryCode', countryCode);
        return this.http.get<ApiResponse<HealthEntityType[]>>(`${this.baseUrl}health-entity-types`, { params });
    }
}
