import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Company, CompanyRequest } from '../models/company.model';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private readonly baseUrl = `${environment.adminApiUrl}companies`;

    // Core signals for state management
    private companiesSignal = signal<Company[]>([]);
    private selectedCompanySignal = signal<Company | null>(null);
    private loadingSignal = signal(false);
    private errorSignal = signal<any>(null);

    // Public read-only signals
    companies = this.companiesSignal.asReadonly();
    selectedCompany = this.selectedCompanySignal.asReadonly();
    loading = this.loadingSignal.asReadonly();
    error = this.errorSignal.asReadonly();

    // Computed properties
    companiesCount = computed(() => this.companiesSignal().length);
    companyIds = computed(() => this.companiesSignal().map(c => c.id));

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    // Computed selector for single company by ID
    selectCompanyById(id: number) {
        return computed(() => this.companiesSignal().find(c => c.id === id) || null);
    }

    private extractSubdomain(): string {
        const host = window.location.hostname;
        const parts = host.split('.');
        if (parts.length < 3) return 'dev';
        return parts[0];
    }

    // GET - Load all companies
    loadCompanies() {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.get<ApiResponse<Company[]>>(this.baseUrl);

        return request.pipe(
            map((response: ApiResponse<Company[]>) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    this.companiesSignal.set(response.data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: `${response.data.length} compañías cargadas correctamente`,
                        life: 3000
                    });
                }
                return response;
            })
        );
    }

    // GET - Load single company by ID
    loadCompanyById(id: number) {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${id}?recordStates=active`);

        return request.pipe(
            map((response: ApiResponse<Company>) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    this.selectedCompanySignal.set(response.data);
                }
                return response;
            })
        );
    }

    // GET - Load company by subdomain
    loadCompany() {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${this.extractSubdomain()}`);

        return request.pipe(
            map((response: ApiResponse<Company>) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    this.selectedCompanySignal.set(response.data);
                }
                return response;
            })
        );
    }

    // POST - Create new company
    createCompany(company: CompanyRequest) {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.post<ApiResponse<Company>>(this.baseUrl, { data: company });

        return request.pipe(
            map((response: ApiResponse<Company>) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    // Add to companies list
                    this.companiesSignal.update(companies => [...companies, response.data as Company]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía creada correctamente',
                        life: 3000
                    });
                }
                return response;
            })
        );
    }

    // PUT - Update full company
    updateCompany(company: CompanyRequest) {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.put<ApiResponse<Company>>(`${this.baseUrl}`, company);

        return request.pipe(
            map((response: ApiResponse<Company>) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    // Update in companies list
                    this.companiesSignal.update(companies =>
                        companies.map(c => c.id === response.data.id ? response.data : c)
                    );
                    if (this.selectedCompanySignal()?.id === response.data.id) {
                        this.selectedCompanySignal.set(response.data);
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía actualizada correctamente',
                        life: 3000
                    });
                }
                return response;
            })
        );
    }

    // PATCH - Partial update company
    patchCompany(id: number, changes: Partial<Company>) {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.patch<ApiResponse<Company>>(`${this.baseUrl}/${id}`, changes);

        return request.pipe(
            map((response: ApiResponse<Company>) => {
                this.loadingSignal.set(false);
                if (response.success && response.data) {
                    // Update in companies list
                    this.companiesSignal.update(companies =>
                        companies.map(c => c.id === response.data.id ? response.data : c)
                    );
                    if (this.selectedCompanySignal()?.id === response.data.id) {
                        this.selectedCompanySignal.set(response.data);
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía actualizada correctamente',
                        life: 3000
                    });
                }
                return response;
            })
        );
    }

    // DELETE - Delete company
    deleteCompany(id: number) {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        const request = this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);

        return request.pipe(
            map((response: ApiResponse<void>) => {
                this.loadingSignal.set(false);
                if (response.success) {
                    // Remove from companies list
                    this.companiesSignal.update(companies =>
                        companies.filter(c => c.id !== id)
                    );
                    if (this.selectedCompanySignal()?.id === id) {
                        this.selectedCompanySignal.set(null);
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Compañía eliminada correctamente',
                        life: 3000
                    });
                }
                return response;
            })
        );
    }

    // PUT - Update by subdomain
    updateCompanyBySubdomain(company: Company) {
        const subdomain = this.extractSubdomain();
        return this.http.put<ApiResponse<Company>>(`${this.baseUrl}/${subdomain}`, company);
    }

    // Utility method to set selected company
    setSelectedCompany(company: Company | null) {
        this.selectedCompanySignal.set(company);
    }

    // Utility method to reset state
    resetState() {
        this.companiesSignal.set([]);
        this.selectedCompanySignal.set(null);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
    }
}
