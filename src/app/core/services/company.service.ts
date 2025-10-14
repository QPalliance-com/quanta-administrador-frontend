import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Company } from '../models/company.model';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private readonly baseUrl = `${environment.apiUrl}company360/companies`;

    constructor(private http: HttpClient) {}

    private extractSubdomain(): string {
        const host = window.location.hostname;
        const parts = host.split('.');
        // Manejo de dominio local o sin subdominio
        if (parts.length < 3) return 'dev';

        return parts[0]; // empresa1
    }

    // GET - Cargar todas las compañías (listado)
    loadCompanies() {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<Company[]>>('data/company360/companies.json');
        }
        return this.http.get<ApiResponse<Company[]>>(this.baseUrl);
    }

    // GET - Cargar compañía específica por ID
    loadCompanyById(id: number) {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<Company[]>>('data/company360/companies.json').pipe(
                map((response: ApiResponse<Company[]>) => {
                    const company = response.data.find(c => c.id === id);
                    if (!company) {
                        throw new Error(`Company with ID ${id} not found`);
                    }
                    return {
                        ...response,
                        data: company,
                        message: 'Company info fetched'
                    } as ApiResponse<Company>;
                })
            );
        }
        return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${id}`);
    }

    // GET - Cargar compañía por subdominio (método original)
    loadCompany() {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<Company>>('data/company360/company.json');
        }
        const subdomain = this.extractSubdomain();
        return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${subdomain}`);
    }

    // POST - Crear nueva compañía
    createCompany(company: Omit<Company, 'id'>) {
        if (environment.useMockApi) {
            // En mock, simular creación con ID temporal
            const mockCompany = { ...company, id: Date.now() };
            return this.http.get<ApiResponse<Company[]>>('data/company360/companies.json').pipe(
                map((response: ApiResponse<Company[]>) => ({
                    ...response,
                    data: mockCompany,
                    message: 'Company created successfully'
                } as ApiResponse<Company>))
            );
        }
        return this.http.post<ApiResponse<Company>>(this.baseUrl, company);
    }

    // PUT - Actualizar compañía completa
    updateCompany(company: Company) {
        if (environment.useMockApi) {
            // En modo mock, simular actualización exitosa
            return this.http.get<ApiResponse<Company[]>>('data/company360/companies.json').pipe(
                map((response: ApiResponse<Company[]>) => ({
                    ...response,
                    data: company,
                    message: 'Company updated successfully'
                } as ApiResponse<Company>))
            );
        }
        return this.http.put<ApiResponse<Company>>(`${this.baseUrl}/${company.id}`, company);
    }

    // PATCH - Actualizar campos específicos de compañía
    patchCompany(id: number, changes: Partial<Company>) {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<Company[]>>('data/company360/companies.json').pipe(
                map((response: ApiResponse<Company[]>) => {
                    const company = response.data.find(c => c.id === id);
                    if (!company) {
                        throw new Error(`Company with ID ${id} not found`);
                    }
                    const updatedCompany = { ...company, ...changes };
                    return {
                        ...response,
                        data: updatedCompany,
                        message: 'Company updated successfully'
                    } as ApiResponse<Company>;
                })
            );
        }
        return this.http.patch<ApiResponse<Company>>(`${this.baseUrl}/${id}`, changes);
    }

    // DELETE - Eliminar compañía
    deleteCompany(id: number) {
        if (environment.useMockApi) {
            return this.http.get<ApiResponse<Company[]>>('data/company360/companies.json').pipe(
                map((response: ApiResponse<Company[]>) => {
                    const company = response.data.find(c => c.id === id);
                    if (!company) {
                        throw new Error(`Company with ID ${id} not found`);
                    }
                    return {
                        success: true,
                        message: 'Company deleted successfully',
                        data: undefined,
                        traceId: response.traceId
                    } as ApiResponse<void>;
                })
            );
        }
        return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
    }

    // PUT - Actualizar por subdominio (método original)
    updateCompanyBySubdomain(company: Company) {
        const subdomain = this.extractSubdomain();
        if (environment.useMockApi) {
            return this.http.put<ApiResponse<Company>>('data/company360/company.json', company);
        }
        return this.http.put<ApiResponse<Company>>(`${this.baseUrl}/${subdomain}`, company);
    }
}
