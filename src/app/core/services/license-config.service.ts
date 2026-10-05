import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    ApiResponse,
    LicenseConfig,
    LicenseConfigOverride,
    UpdateLicenseConfigDto,
    UpdateLicenseConfigResult
} from '@/core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenseConfigService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}license-config`;

    getGlobal(): Observable<ApiResponse<LicenseConfig>> {
        return this.http.get<ApiResponse<LicenseConfig>>(this.apiUrl);
    }

    getOverrides(): Observable<ApiResponse<LicenseConfigOverride[]>> {
        return this.http.get<ApiResponse<LicenseConfigOverride[]>>(`${this.apiUrl}/overrides`);
    }

    update(payload: UpdateLicenseConfigDto): Observable<ApiResponse<UpdateLicenseConfigResult>> {
        return this.http.put<ApiResponse<UpdateLicenseConfigResult>>(this.apiUrl, { data: payload });
    }
}
