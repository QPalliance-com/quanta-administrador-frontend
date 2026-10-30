import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AccountingProviderConfig, AccountingProviderOption, SaveCredentialsRequest, SaveCredentialsResult } from '../models/accounting-provider.model';
import { localErrorHandling } from '../interceptors/local-error-handling';

@Injectable({ providedIn: 'root' })
export class AccountingProviderService {
    private readonly adminUrl = environment.adminApiUrl;

    constructor(private http: HttpClient) {}

    /** Catálogo de proveedores con su credentialSchema. */
    getProviders() {
        return this.http.get<ApiResponse<AccountingProviderOption[]>>(`${this.adminUrl}accounting-providers`);
    }

    /** data: null = la empresa no tiene proveedor configurado (no es un error). */
    getConfig(companyId: number) {
        return this.http.get<ApiResponse<AccountingProviderConfig | null>>(`${this.adminUrl}companies/${companyId}/accounting-provider`);
    }

    /** Guarda las credenciales de un ambiente y prueba la conexión; los 4xx los muestra el feature (422: códigos 70/71). */
    saveCredentials(companyId: number, request: SaveCredentialsRequest) {
        return this.http.post<ApiResponse<SaveCredentialsResult>>(`${this.adminUrl}companies/${companyId}/accounting-provider/credentials`, { data: request }, { context: localErrorHandling() });
    }
}
