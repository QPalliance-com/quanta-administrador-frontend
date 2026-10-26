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
import { localErrorHandling } from '@/core/interceptors/local-error-handling';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LicenseConfigService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.adminApiUrl}license-config`;
    // 400/403/404 se muestran en el feature con el mensaje del backend (QUAN-1469), no con el toast global
    private options = { context: localErrorHandling() };

    getGlobal(): Observable<ApiResponse<LicenseConfig>> {
        return this.http.get<ApiResponse<LicenseConfig>>(this.apiUrl, this.options);
    }

    getOverrides(): Observable<ApiResponse<LicenseConfigOverride[]>> {
        return this.http.get<ApiResponse<LicenseConfigOverride[]>>(`${this.apiUrl}/overrides`, this.options);
    }

    update(payload: UpdateLicenseConfigDto): Observable<ApiResponse<UpdateLicenseConfigResult>> {
        return this.http.put<ApiResponse<UpdateLicenseConfigResult>>(this.apiUrl, { data: payload }, this.options);
    }
}
