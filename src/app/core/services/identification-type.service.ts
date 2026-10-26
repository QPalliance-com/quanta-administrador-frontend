import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '@/core/models/api-response.model';
import { IdentificationType } from '@/core/models/identification-type.model';

@Injectable({ providedIn: 'root' })
export class IdentificationTypeService {
    private http = inject(HttpClient);
    private readonly baseUrl = environment.adminApiUrl;

    getByCountry(countryCode: string) {
        const params = new HttpParams().set('countryCode', countryCode);
        return this.http.get<ApiResponse<IdentificationType[]>>(`${this.baseUrl}identification-types`, { params });
    }
}
