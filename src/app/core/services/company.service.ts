import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company, CompanyRequest } from '../models/company.model';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private readonly baseUrl = `${environment.adminApiUrl}companies`;

    constructor(private http: HttpClient) {}

    private extractSubdomain(): string {
        const host = window.location.hostname;
        const parts = host.split('.');
        if (parts.length < 3) return 'dev';
        return parts[0];
    }

    loadCompanies() {
        return this.http.get<ApiResponse<Company[]>>(this.baseUrl);
    }

    loadCompanyById(id: number) {
        return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${id}?recordStates=active`);
    }

    loadCompany() {
        return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${this.extractSubdomain()}`);
    }

    createCompany(company: CompanyRequest) {
        return this.http.post<ApiResponse<Company>>(this.baseUrl, { data: company });
    }

    updateCompany(company: CompanyRequest) {
        return this.http.put<ApiResponse<Company>>(this.baseUrl, { data: company });
    }

    patchCompany(id: number, changes: Partial<Company>) {
        return this.http.patch<ApiResponse<Company>>(`${this.baseUrl}/${id}`, changes);
    }

    deleteCompany(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
    }

    updateCompanyBySubdomain(company: Company) {
        const subdomain = this.extractSubdomain();
        return this.http.put<ApiResponse<Company>>(`${this.baseUrl}/${subdomain}`, company);
    }
}
